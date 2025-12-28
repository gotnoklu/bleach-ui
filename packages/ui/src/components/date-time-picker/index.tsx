import { createElement, type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { Animated, Modal, Pressable, ScrollView, View, type ViewProps } from 'react-native'
import { useTheme } from '../../theme/context'
import { styled } from '../../theme/styles'
import type { Palette, TextPaletteColors, Theme } from '../../theme/types'
import { Box } from '../box'
import { Button } from '../button'
import {
  IconCalendar,
  IconCalendarTime,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconClockHour4,
} from '../icons'
import { Input } from '../input'
import { Show } from '../show'
import { Text } from '../text'

export type DateTimePickerVariant = 'outlined' | 'filled'
export type DateTimePickerType = 'date' | 'time' | 'datetime'
export type CalendarView = 'days' | 'months' | 'years'

export interface DateTimePickerProps extends ViewProps {
  variant?: DateTimePickerVariant
  type?: DateTimePickerType
  value?: Date
  minDate?: Date
  maxDate?: Date
  label?: ReactNode
  description?: ReactNode
  placeholder?: string
  color?: keyof Palette | keyof TextPaletteColors | (string & {})
  fullWidth?: boolean
  disabled?: boolean
  invalid?: boolean
  format?: string
  onChange?: (date: Date) => void
}

const StyledDateTimePicker = styled(View)<DateTimePickerProps>((_, { fullWidth }) => ({
  width: fullWidth ? '100%' : 'auto',
}))

const StyledPicker = styled(View)((theme: Theme) => ({
  backgroundColor: theme.palette.card,
  borderRadius: theme.radius(3),
  overflow: 'hidden',
  width: 360,
  alignSelf: 'center',
  shadowColor: 'rgba(0, 0, 0, 0.2)',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 12,
  elevation: 8,
}))

const StyledContent = styled(View)((theme: Theme) => ({
  padding: theme.spacing(2),
}))

const StyledCalendarGrid = styled(View)((theme: Theme) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginHorizontal: -theme.spacing(1),
  marginTop: theme.spacing(2),
}))

const StyledCell = styled(View)((theme: Theme) => ({
  width: '14.28%',
  padding: theme.spacing(1),
  alignItems: 'center',
  justifyContent: 'center',
  height: 44,
}))

const StyledYearGrid = styled(View)((theme: Theme) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: theme.spacing(1),
}))

const StyledYearCell = styled(View)((theme: Theme) => ({
  width: '33.33%',
  padding: theme.spacing(0.5),
}))

const StyledMonthGrid = styled(View)((theme: Theme) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: theme.spacing(2),
}))

const StyledMonthCell = styled(View)((theme: Theme) => ({
  width: '33.33%',
  padding: theme.spacing(1),
}))

const StyledTimeColumn = styled(ScrollView)((theme: Theme) => ({
  maxHeight: 280,
  paddingVertical: theme.spacing(1),
  backgroundColor: theme.palette.card,
}))

const DayLabels = [
  { label: 'S', key: 'sunday' },
  { label: 'M', key: 'monday' },
  { label: 'T', key: 'tuesday' },
  { label: 'W', key: 'wednesday' },
  { label: 'T', key: 'thursday' },
  { label: 'F', key: 'friday' },
  { label: 'S', key: 'saturday' },
]

const DateTimePickerViewIcons = {
  time: IconClockHour4,
  date: IconCalendar,
  datetime: IconCalendarTime,
}

const DateTimePickerViews = {
  time: 'time',
  date: 'date',
  datetime: 'date',
} as const

type DatePickerState = {
  isOpen: boolean
  value: Date
  currentViews: {
    root: 'time' | 'date'
    calendar: 'days' | 'months' | 'years'
    month: number
    year: number
  }
}

export function DateTimePicker({
  variant = 'outlined',
  type = 'datetime',
  value,
  minDate,
  maxDate,
  label,
  description,
  placeholder = 'Select date and time',
  color = 'primary',
  fullWidth = false,
  disabled = false,
  invalid = false,
  format = 'MM/dd/yyyy HH:mm',
  onChange,
  ...props
}: DateTimePickerProps) {
  const theme = useTheme()
  const [datePickerState, setDatePickerState] = useState<DatePickerState>(() => {
    const selectedDate = value ?? new Date()
    return {
      isOpen: false,
      value: value ?? new Date(),
      currentViews: {
        root: type === 'time' ? 'time' : 'date',
        calendar: 'days',
        month: selectedDate.getMonth(),
        year: selectedDate.getFullYear(),
      },
    }
  })

  const slideAnim = useState(new Animated.Value(0))[0]
  const scrollViewRef = useRef<ScrollView>(null)

  useEffect(() => {
    if (scrollViewRef.current && datePickerState.currentViews.calendar === 'years') {
      const startYear = datePickerState.currentViews.year - 100
      const selectedYearIndex = datePickerState.value.getFullYear() - startYear
      const rowIndex = Math.floor(selectedYearIndex / 3)
      const scrollPosition = rowIndex * 40 - 120

      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ y: Math.max(0, scrollPosition), animated: false })
      }, 0)
    }
  }, [datePickerState.currentViews.calendar, datePickerState.currentViews.year, datePickerState.value])

  const formatDate = useCallback(
    (date: Date): string => {
      if (!date) return ''
      return format
        .replace('MM', String(date.getMonth() + 1).padStart(2, '0'))
        .replace('dd', String(date.getDate()).padStart(2, '0'))
        .replace('yyyy', String(date.getFullYear()))
        .replace('HH', String(date.getHours()).padStart(2, '0'))
        .replace('mm', String(date.getMinutes()).padStart(2, '0'))
    },
    [format]
  )

  const handleOpen = () => {
    if (type === 'time') {
      slideAnim.setValue(-360)
    } else {
      slideAnim.setValue(0)
    }

    setDatePickerState((prev) => ({
      ...prev,
      isOpen: true,
      currentViews: { ...prev.currentViews, root: DateTimePickerViews[type] },
    }))
  }

  const handleClose = () => {
    setDatePickerState((prev) => ({ ...prev, isOpen: false, currentViews: { ...prev.currentViews, calendar: 'days' } }))
  }

  const handleDateSelect = (date: Date) => {
    setDatePickerState((prev) => ({ ...prev, value: date }))

    if (type === 'date') {
      if (onChange) onChange(date)
      handleClose()
    } else {
      animateToTime()
    }
  }

  const handleTimeSelect = (hours: number, minutes: number) => {
    const date = new Date(datePickerState.value)
    date.setHours(hours)
    date.setMinutes(minutes)
    setDatePickerState((prev) => ({ ...prev, value: date }))

    if (onChange) onChange(date)
    // handleClose()
  }

  const animateToTime = () => {
    Animated.timing(slideAnim, {
      toValue: -360,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setDatePickerState((prev) => ({ ...prev, currentViews: { ...prev.currentViews, root: 'time' } }))
    })
  }

  const animateToDate = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setDatePickerState((prev) => ({ ...prev, currentViews: { ...prev.currentViews, root: 'date' } }))
    })
  }

  const renderYears = () => {
    const years = []
    const startYear = datePickerState.currentViews.year - 10
    const endYear = datePickerState.currentViews.year + 10

    for (let year = startYear; year <= endYear; year++) {
      const isSelected = year === datePickerState.currentViews.year
      const isCurrent = year === datePickerState.value.getFullYear()
      const isDisabled = (minDate && new Date(year, 11, 31) < minDate) || (maxDate && new Date(year, 0, 1) > maxDate)

      years.push(
        <StyledYearCell key={year}>
          <Button
            variant={isSelected ? 'filled' : isCurrent ? 'outlined' : 'ghost'}
            onPress={() => {
              setDatePickerState((prev) => ({
                ...prev,
                currentViews: { ...prev.currentViews, year, calendar: 'months' },
              }))
            }}
            disabled={isDisabled}
            fullWidth
          >
            <Text
              variant="sm"
              color={
                isSelected
                  ? 'primary.foreground'
                  : isDisabled
                    ? 'disabled'
                    : isCurrent
                      ? 'primary.main'
                      : 'text.primary'
              }
            >
              {year}
            </Text>
          </Button>
        </StyledYearCell>
      )
    }

    return (
      <ScrollView style={{ maxHeight: 300 }} showsVerticalScrollIndicator={false}>
        <Box style={{ paddingVertical: 8 }}>
          <StyledYearGrid>{years}</StyledYearGrid>
        </Box>
      </ScrollView>
    )
  }

  const renderMonths = () => {
    const months: Array<ReactNode> = []
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    monthNames.forEach((month, index) => {
      const isSelected = index === datePickerState.currentViews.month
      const isCurrent = index === datePickerState.value.getMonth()

      months.push(
        <StyledMonthCell key={month}>
          <Button
            variant={isSelected ? 'filled' : isCurrent ? 'outlined' : 'ghost'}
            onPress={() => {
              setDatePickerState((prev) => ({
                ...prev,
                currentViews: { ...prev.currentViews, month: index, calendar: 'days' },
              }))
            }}
            viewProps={{
              text: {
                variant: 'sm',
                color: !isSelected ? (isCurrent ? 'primary.main' : 'text.primary') : undefined,
              },
            }}
            fullWidth
          >
            {month.substring(0, 3)}
          </Button>
        </StyledMonthCell>
      )
    })

    return <StyledMonthGrid>{months}</StyledMonthGrid>
  }

  const renderCalendar = () => {
    const daysInMonth = new Date(datePickerState.currentViews.year, datePickerState.currentViews.month + 1, 0).getDate()
    const firstDayOfMonth = new Date(datePickerState.currentViews.year, datePickerState.currentViews.month, 1).getDay()
    const days = []

    DayLabels.forEach((day) => {
      days.push(
        <StyledCell key={`label-${day.label}-${day.key}`} style={{ height: 32 }}>
          <Text variant="sm" color="text.secondary">
            {day.label}
          </Text>
        </StyledCell>
      )
    })

    // Empty cells before first day
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<StyledCell key={`empty-${i}`} />)
    }

    // Days of month
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(datePickerState.currentViews.year, datePickerState.currentViews.month, i)
      const isSelected =
        datePickerState.value &&
        currentDate.getDate() === datePickerState.value.getDate() &&
        currentDate.getMonth() === datePickerState.value.getMonth() &&
        currentDate.getFullYear() === datePickerState.value.getFullYear()

      const isToday =
        currentDate.getDate() === new Date().getDate() &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear()

      const isDisabled = (minDate && currentDate < minDate) || (maxDate && currentDate > maxDate)

      days.push(
        <StyledCell key={i}>
          <Button
            size="sm"
            variant={isSelected ? 'filled' : isToday ? 'outlined' : 'ghost'}
            viewProps={{
              text: {
                variant: 'sm',
                color: !isSelected ? (isToday ? 'primary.main' : 'text.primary') : undefined,
              },
            }}
            onPress={() => handleDateSelect(currentDate)}
            disabled={isDisabled}
            style={{ minWidth: 40, paddingHorizontal: 0 }}
            shape="rounded"
          >
            {i}
          </Button>
        </StyledCell>
      )
    }

    return <StyledCalendarGrid>{days}</StyledCalendarGrid>
  }

  const renderTimePicker = () => {
    const hours = []
    const minutes = []

    for (let i = 0; i < 24; i++) {
      const isSelected = datePickerState.value.getHours() === i
      const isDisabled =
        (minDate && datePickerState.value.getDate() === minDate.getDate() && i < minDate.getHours()) ||
        (maxDate && datePickerState.value.getDate() === maxDate.getDate() && i > maxDate.getHours())

      hours.push(
        <Button
          key={i}
          variant={isSelected ? 'outlined' : 'ghost'}
          onPress={() => handleTimeSelect(i, datePickerState.value.getMinutes())}
          disabled={isDisabled}
        >
          <Text variant="xl" color={isSelected ? 'primary.main' : isDisabled ? 'disabled' : 'text.primary'}>
            {String(i).padStart(2, '0')}
          </Text>
        </Button>
      )
    }

    for (let i = 0; i < 60; i += 5) {
      const isSelected = datePickerState.value.getMinutes() === i
      const isDisabled =
        (minDate &&
          datePickerState.value.getDate() === minDate.getDate() &&
          datePickerState.value.getHours() === minDate.getHours() &&
          i < minDate.getMinutes()) ||
        (maxDate &&
          datePickerState.value.getDate() === maxDate.getDate() &&
          datePickerState.value.getHours() === maxDate.getHours() &&
          i > maxDate.getMinutes())
      minutes.push(
        <Button
          key={i}
          variant={isSelected ? 'outlined' : 'ghost'}
          onPress={() => handleTimeSelect(datePickerState.value.getHours(), i)}
          disabled={isDisabled}
        >
          <Text variant="xl" color={isSelected ? 'primary.main' : isDisabled ? 'disabled' : 'text.primary'}>
            {String(i).padStart(2, '0')}
          </Text>
        </Button>
      )
    }

    return (
      <Box direction="row" style={{ gap: 16 }}>
        <Box flex={1}>
          <Text variant="sm" color="text.secondary" textAlign="center" style={{ marginBottom: 8 }}>
            Hours
          </Text>
          <StyledTimeColumn
            showsVerticalScrollIndicator={false}
            contentOffset={{ x: 0, y: datePickerState.value.getHours() * 42 }}
          >
            {hours}
          </StyledTimeColumn>
        </Box>
        <Box flex={1}>
          <Text variant="sm" color="text.secondary" textAlign="center" style={{ marginBottom: 8 }}>
            Minutes
          </Text>
          <StyledTimeColumn
            showsVerticalScrollIndicator={false}
            contentOffset={{ x: 0, y: Math.floor(datePickerState.value.getMinutes() / 5) * 42 }}
          >
            {minutes}
          </StyledTimeColumn>
        </Box>
      </Box>
    )
  }

  const renderTimeView = () => (
    <>
      <Box
        direction="row"
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <Show when={type !== 'time'}>
          <Button variant="ghost" size="icon" onPress={animateToDate}>
            <IconChevronLeft size={24} />
          </Button>
        </Show>
        <Text variant="lg">Select Time</Text>
        <Box style={{ width: 40 }} />
      </Box>

      {renderTimePicker()}

      <Box
        direction="row"
        style={{
          justifyContent: 'flex-end',
          gap: 8,
          paddingTop: 16,
        }}
      >
        <Button variant="filled" style={{ flex: 1 }} onPress={handleClose}>
          Select
        </Button>
      </Box>
    </>
  )

  return (
    <StyledDateTimePicker fullWidth={fullWidth} {...props}>
      <Input
        variant={variant}
        label={label}
        description={description}
        placeholder={placeholder}
        invalid={invalid}
        fullWidth={fullWidth}
        value={formatDate(datePickerState.value)}
        editable={false}
        onPressIn={handleOpen}
        rightActions={
          <Button size="icon-sm" variant="ghost" onPress={handleOpen} disabled={disabled}>
            {createElement(DateTimePickerViewIcons[type], { color: disabled ? 'disabled' : 'icon' })}
          </Button>
        }
        disabled={disabled}
      />
      <Modal visible={datePickerState.isOpen} transparent animationType="fade" onRequestClose={handleClose}>
        <Pressable
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: 16,
          }}
          onPress={handleClose}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <StyledPicker>
              <Animated.View
                style={{
                  flexDirection: 'row',
                  width: 720,
                  transform: [{ translateX: slideAnim }],
                }}
              >
                <View style={{ width: 360 }}>
                  <StyledContent>
                    {datePickerState.currentViews.root === 'date' && (
                      <>
                        <Box direction="row" justifyContent="space-between" alignItems="center" marginBottom={2}>
                          {datePickerState.currentViews.calendar === 'days' && (
                            <Box direction="row" alignItems="center" justifyContent="space-between" width="100%">
                              <Button
                                variant="ghost"
                                onPress={() => {
                                  setDatePickerState((prev) => ({
                                    ...prev,
                                    currentViews: { ...prev.currentViews, calendar: 'years' },
                                  }))
                                }}
                                style={{
                                  minWidth: 120,
                                  paddingHorizontal: theme.spacing(1),
                                }}
                              >
                                <Text variant="lg" textAlign="left">
                                  {new Date(
                                    datePickerState.currentViews.year,
                                    datePickerState.currentViews.month
                                  ).toLocaleString('default', {
                                    month: 'long',
                                    year: 'numeric',
                                  })}
                                </Text>
                                <IconChevronDown size={20.5} />
                              </Button>
                              <Box
                                direction="row"
                                style={{
                                  gap: 8,
                                  height: '100%',
                                }}
                              >
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onPress={() => {
                                    setDatePickerState((prev) => ({
                                      ...prev,
                                      currentViews: {
                                        ...prev.currentViews,
                                        month: prev.currentViews.month === 0 ? 11 : prev.currentViews.month - 1,
                                        year:
                                          prev.currentViews.month === 0
                                            ? prev.currentViews.year - 1
                                            : prev.currentViews.year,
                                      },
                                    }))
                                  }}
                                >
                                  <IconChevronLeft size={24} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onPress={() => {
                                    setDatePickerState((prev) => ({
                                      ...prev,
                                      currentViews: {
                                        ...prev.currentViews,
                                        month: prev.currentViews.month === 11 ? 0 : prev.currentViews.month + 1,
                                        year:
                                          prev.currentViews.month === 11
                                            ? prev.currentViews.year + 1
                                            : prev.currentViews.year,
                                      },
                                    }))
                                  }}
                                >
                                  <IconChevronRight size={24} />
                                </Button>
                              </Box>
                            </Box>
                          )}
                          {datePickerState.currentViews.calendar === 'years' && (
                            <Text variant="lg" textAlign="center" style={{ width: '100%' }}>
                              Select Year
                            </Text>
                          )}
                          {datePickerState.currentViews.calendar === 'months' && (
                            <Box flex={1} alignItems="center">
                              <Text variant="lg" style={{ flex: 1 }}>
                                Select Month
                              </Text>
                              <Button
                                variant="ghost"
                                onPress={() => {
                                  setDatePickerState((prev) => ({
                                    ...prev,
                                    currentViews: {
                                      ...prev.currentViews,
                                      calendar: 'years',
                                    },
                                  }))
                                }}
                              >
                                <Text variant="lg" textAlign="center">
                                  {datePickerState.currentViews.year}
                                </Text>
                              </Button>
                            </Box>
                          )}
                        </Box>

                        {datePickerState.currentViews.calendar === 'days' && renderCalendar()}
                        {datePickerState.currentViews.calendar === 'years' && renderYears()}
                        {datePickerState.currentViews.calendar === 'months' && renderMonths()}

                        {type === 'datetime' && datePickerState.currentViews.calendar === 'days' && (
                          <Box direction="row" justifyContent="flex-end" gap={1} marginTop={4}>
                            <Button variant="ghost" style={{ flex: 1 }} onPress={handleClose}>
                              Cancel
                            </Button>
                            <Button variant="filled" style={{ flex: 1 }} onPress={animateToTime}>
                              Next
                            </Button>
                          </Box>
                        )}
                      </>
                    )}
                  </StyledContent>
                </View>
                <View style={{ width: 360 }}>
                  <StyledContent>{datePickerState.currentViews.root === 'time' && renderTimeView()}</StyledContent>
                </View>
              </Animated.View>
            </StyledPicker>
          </Pressable>
        </Pressable>
      </Modal>
    </StyledDateTimePicker>
  )
}
