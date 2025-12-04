import { useState, useCallback, useRef, useEffect, type ReactNode } from 'react'
import {
  Modal,
  View,
  ScrollView,
  Animated,
  type ViewProps,
  type TextInputProps,
  Pressable,
} from 'react-native'
import type { SxProps, Palette, TextColor, Theme } from '../../theme/types'
import { styled } from '../../theme/utilities'
import { useTheme } from '../../theme/hooks'
import Typography from '../Typography'
import Icon from '../Icon'
import Box from '../Box'
import Button from '../Button'
import TextField, { type TextFieldProps } from '../TextField'
import IconButton from '../IconButton'

export type DateTimePickerVariant = 'outlined' | 'filled'
export type DateTimePickerView = 'date' | 'time' | 'datetime'
export type CalendarView = 'days' | 'months' | 'years'

export interface DateTimePickerProps extends ViewProps, SxProps<ViewProps> {
  variant?: DateTimePickerVariant
  view?: DateTimePickerView
  value?: Date
  minDate?: Date
  maxDate?: Date
  label?: ReactNode
  description?: ReactNode
  placeholder?: string
  color?: keyof Palette | keyof TextColor | (string & {})
  fullWidth?: boolean
  disabled?: boolean
  isInvalid?: boolean
  format?: string
  onChange?: (date: Date) => void
  slotProps?: {
    paper?: ViewProps
    label?: ViewProps
    description?: ViewProps
    textField?: Partial<TextFieldProps>
  }
}

const StyledDateTimePicker = styled(View)<DateTimePickerProps>((_, { fullWidth }) => ({
  width: fullWidth ? '100%' : 'auto',
}))

const StyledPicker = styled(View)((theme: Theme) => ({
  backgroundColor: theme.palette.backgrounds.paper,
  borderRadius: theme.radius.create(3),
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
  padding: theme.spacing.create(2),
}))

const StyledCalendarGrid = styled(View)((theme: Theme) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginHorizontal: -theme.spacing.create(1),
  marginTop: theme.spacing.create(2),
}))

const StyledCell = styled(View)((theme: Theme) => ({
  width: '14.28%',
  padding: theme.spacing.create(1),
  alignItems: 'center',
  justifyContent: 'center',
  height: 44,
}))

const StyledYearGrid = styled(View)((theme: Theme) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: theme.spacing.create(1),
}))

const StyledYearCell = styled(View)((theme: Theme) => ({
  width: '33.33%',
  padding: theme.spacing.create(0.5),
}))

const StyledMonthGrid = styled(View)((theme: Theme) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: theme.spacing.create(2),
}))

const StyledMonthCell = styled(View)((theme: Theme) => ({
  width: '33.33%',
  padding: theme.spacing.create(1),
}))

const StyledTimeColumn = styled(ScrollView)((theme: Theme) => ({
  maxHeight: 280,
  paddingVertical: theme.spacing.create(1),
  backgroundColor: theme.palette.backgrounds.paper,
}))

export default function DateTimePicker({
  variant = 'outlined',
  view = 'datetime',
  value,
  minDate,
  maxDate,
  label,
  description,
  placeholder = 'Select date and time',
  color = 'primary',
  fullWidth = false,
  disabled = false,
  isInvalid = false,
  format = 'MM/dd/yyyy HH:mm',
  onChange,
  slotProps,
  ...props
}: DateTimePickerProps) {
  const theme = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(value || new Date())
  const [currentView, setCurrentView] = useState<'date' | 'time'>(view === 'time' ? 'time' : 'date')
  const [calendarView, setCalendarView] = useState<CalendarView>('days')
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth())
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear())
  const slideAnim = useState(new Animated.Value(0))[0]
  const scrollViewRef = useRef<ScrollView>(null)

  useEffect(() => {
    if (scrollViewRef.current && calendarView === 'years') {
      const startYear = currentYear - 100
      const selectedYearIndex = selectedDate.getFullYear() - startYear
      const rowIndex = Math.floor(selectedYearIndex / 3)
      const scrollPosition = rowIndex * 40 - 120

      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ y: Math.max(0, scrollPosition), animated: false })
      }, 0)
    }
  }, [calendarView, currentYear, selectedDate])

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
    if (disabled) return
    if (view === 'time') {
      setCurrentView('time')
      slideAnim.setValue(-360)
    } else {
      setCurrentView('date')
      slideAnim.setValue(0)
    }
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setCalendarView('days')
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    if (view === 'date') {
      if (onChange) onChange(date)
      handleClose()
    } else {
      animateToTime()
    }
  }

  const handleTimeSelect = (hours: number, minutes: number) => {
    const newDate = new Date(selectedDate)
    newDate.setHours(hours)
    newDate.setMinutes(minutes)
    setSelectedDate(newDate)
    if (onChange) onChange(newDate)
    // handleClose()
  }

  const animateToTime = () => {
    setCurrentView('time')
    Animated.timing(slideAnim, {
      toValue: -360,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  const animateToDate = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentView('date')
    })
  }

  const renderYears = () => {
    const years = []
    const startYear = currentYear - 10
    const endYear = currentYear + 10

    for (let year = startYear; year <= endYear; year++) {
      const isSelected = year === currentYear
      const isCurrent = year === selectedDate.getFullYear()
      const isDisabled =
        (minDate && new Date(year, 11, 31) < minDate) || (maxDate && new Date(year, 0, 1) > maxDate)

      years.push(
        <StyledYearCell key={year}>
          <Button
            variant={isSelected ? 'contained' : isCurrent ? 'outlined' : 'text'}
            onPress={() => {
              setCurrentYear(year)
              setCalendarView('months')
            }}
            disabled={isDisabled}
            fullWidth
          >
            <Typography
              variant="body2"
              color={
                isSelected
                  ? 'primary.text'
                  : isDisabled
                    ? 'disabled'
                    : isCurrent
                      ? 'primary.main'
                      : 'text.primary'
              }
            >
              {year}
            </Typography>
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
      const isSelected = index === currentMonth
      const isCurrent = index === selectedDate.getMonth()

      months.push(
        <StyledMonthCell key={month}>
          <Button
            variant={isSelected ? 'contained' : isCurrent ? 'outlined' : 'text'}
            onPress={() => {
              setCurrentMonth(index)
              setCalendarView('days')
            }}
            slotProps={{
              label: {
                variant: 'body2',
                color: !isSelected ? (isCurrent ? 'primary.main' : 'text.primary') : undefined,
                sx: ({ typography }) => ({ fontSize: typography.variants.body2.fontSize }),
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
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
    const days = []

    // Day labels
    const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    dayLabels.forEach((day, index) => {
      days.push(
        <StyledCell key={`label-${index}`} style={{ height: 32 }}>
          <Typography variant="body2" color="text.secondary">
            {day}
          </Typography>
        </StyledCell>
      )
    })

    // Empty cells before first day
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<StyledCell key={`empty-${i}`} />)
    }

    // Days of month
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(currentYear, currentMonth, i)
      const isSelected =
        selectedDate &&
        currentDate.getDate() === selectedDate.getDate() &&
        currentDate.getMonth() === selectedDate.getMonth() &&
        currentDate.getFullYear() === selectedDate.getFullYear()

      const isToday =
        currentDate.getDate() === new Date().getDate() &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear()

      const isDisabled = (minDate && currentDate < minDate) || (maxDate && currentDate > maxDate)

      days.push(
        <StyledCell key={i}>
          <Button
            size="small"
            variant={isSelected ? 'contained' : isToday ? 'outlined' : 'text'}
            slotProps={{
              label: {
                variant: 'body2',
                color: !isSelected ? (isToday ? 'primary.main' : 'text.primary') : undefined,
                sx: ({ typography }) => ({ fontSize: typography.variants.body2.fontSize }),
              },
            }}
            onPress={() => handleDateSelect(currentDate)}
            disabled={isDisabled}
            style={{ minWidth: 40, paddingHorizontal: 0 }}
            rounded
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
      const isSelected = selectedDate.getHours() === i
      const isDisabled =
        (minDate && selectedDate.getDate() === minDate.getDate() && i < minDate.getHours()) ||
        (maxDate && selectedDate.getDate() === maxDate.getDate() && i > maxDate.getHours())
      hours.push(
        <Button
          key={i}
          variant={isSelected ? 'contained' : 'text'}
          onPress={() => !isDisabled && handleTimeSelect(i, selectedDate.getMinutes())}
          disabled={isDisabled}
          style={{
            margin: 1,
            height: 40,
            backgroundColor: isSelected ? theme.palette.primary.main : 'transparent',
            opacity: isDisabled ? 0.5 : 1,
          }}
        >
          <Typography
            variant="body2"
            color={isSelected ? 'primary.text' : isDisabled ? 'disabled' : 'text.primary'}
          >
            {String(i).padStart(2, '0')}
          </Typography>
        </Button>
      )
    }

    for (let i = 0; i < 60; i += 5) {
      const isSelected = selectedDate.getMinutes() === i
      const isDisabled =
        (minDate &&
          selectedDate.getDate() === minDate.getDate() &&
          selectedDate.getHours() === minDate.getHours() &&
          i < minDate.getMinutes()) ||
        (maxDate &&
          selectedDate.getDate() === maxDate.getDate() &&
          selectedDate.getHours() === maxDate.getHours() &&
          i > maxDate.getMinutes())
      minutes.push(
        <Button
          key={i}
          variant={isSelected ? 'contained' : 'text'}
          onPress={() => !isDisabled && handleTimeSelect(selectedDate.getHours(), i)}
          disabled={isDisabled}
          style={{
            margin: 1,
            height: 40,
            backgroundColor: isSelected ? theme.palette.primary.main : 'transparent',
            opacity: isDisabled ? 0.5 : 1,
          }}
        >
          <Typography
            variant="body2"
            color={isSelected ? 'primary.text' : isDisabled ? 'disabled' : 'text.primary'}
          >
            {String(i).padStart(2, '0')}
          </Typography>
        </Button>
      )
    }

    return (
      <Box direction="row" style={{ gap: 16 }}>
        <Box flex={1}>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ marginBottom: 8, textAlign: 'center' }}
          >
            Hours
          </Typography>
          <StyledTimeColumn
            showsVerticalScrollIndicator={false}
            contentOffset={{ x: 0, y: selectedDate.getHours() * 42 }}
          >
            {hours}
          </StyledTimeColumn>
        </Box>
        <Box flex={1}>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ marginBottom: 8, textAlign: 'center' }}
          >
            Minutes
          </Typography>
          <StyledTimeColumn
            showsVerticalScrollIndicator={false}
            contentOffset={{ x: 0, y: Math.floor(selectedDate.getMinutes() / 5) * 42 }}
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
        <IconButton variant="text" onPress={animateToDate}>
          <Icon name="arrow-left" size={24} color="text.secondary" />
        </IconButton>
        <Typography variant="h6">Select Time</Typography>
        <Box style={{ width: 40 }} />
      </Box>

      {renderTimePicker()}

      <Box
        direction="row"
        style={{
          justifyContent: 'flex-end',
          gap: 8,
          marginTop: 16,
          borderTopWidth: 1,
          borderTopColor: theme.palette.divider,
          paddingTop: 16,
        }}
      >
        <Button variant="text" onPress={animateToDate}>
          Back
        </Button>
        <Button variant="contained" onPress={handleClose}>
          OK
        </Button>
      </Box>
    </>
  )

  return (
    <StyledDateTimePicker fullWidth={fullWidth} {...props}>
      <TextField
        variant={variant}
        label={label}
        description={description}
        placeholder={placeholder}
        isInvalid={isInvalid}
        fullWidth={fullWidth}
        slotProps={{
          textInput: {
            value: formatDate(selectedDate),
            editable: false,
            onPressIn: handleOpen,
          } as TextInputProps,
        }}
        rightAdornments={
          <Icon
            name="calendar"
            size={20}
            color={isInvalid ? 'error' : disabled ? 'disabled' : color}
          />
        }
      />
      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={handleClose}>
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
                    {currentView === 'date' && (
                      <>
                        <Box
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          marginBottom={2}
                        >
                          {calendarView === 'days' && (
                            <Box
                              direction="row"
                              alignItems="center"
                              justifyContent="space-between"
                              width="100%"
                            >
                              <Button
                                onPress={() => setCalendarView('years')}
                                style={{
                                  minWidth: 120,
                                  paddingHorizontal: theme.spacing.create(1),
                                }}
                              >
                                <Typography variant="h6" style={{ textAlign: 'left' }}>
                                  {new Date(currentYear, currentMonth).toLocaleString('default', {
                                    month: 'long',
                                    year: 'numeric',
                                  })}
                                </Typography>
                                <Icon name="triangle-down" color="text.primary" size={20.5} />
                              </Button>
                              <Box
                                direction="row"
                                style={{
                                  gap: 8,
                                  height: '100%',
                                }}
                              >
                                <IconButton
                                  onPress={() => {
                                    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))
                                    if (currentMonth === 0) {
                                      setCurrentYear((prev) => prev - 1)
                                    }
                                  }}
                                >
                                  <Icon name="chevron-left" size={24} />
                                </IconButton>
                                <IconButton
                                  variant="text"
                                  onPress={() => {
                                    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))
                                    if (currentMonth === 11) {
                                      setCurrentYear((prev) => prev + 1)
                                    }
                                  }}
                                >
                                  <Icon name="chevron-right" size={24} />
                                </IconButton>
                              </Box>
                            </Box>
                          )}
                          {calendarView === 'years' && (
                            <Typography variant="h6" style={{ width: '100%', textAlign: 'center' }}>
                              Select Year
                            </Typography>
                          )}
                          {calendarView === 'months' && (
                            <Box flex={1} alignItems="center">
                              <Typography variant="h6" fullFlex>
                                Select Month
                              </Typography>
                              <Button variant="text" onPress={() => setCalendarView('years')}>
                                <Typography variant="h6" style={{ textAlign: 'center' }}>
                                  {currentYear}
                                </Typography>
                              </Button>
                            </Box>
                          )}
                        </Box>

                        {calendarView === 'days' && renderCalendar()}
                        {calendarView === 'years' && renderYears()}
                        {calendarView === 'months' && renderMonths()}

                        {view === 'datetime' && calendarView === 'days' && (
                          <Box direction="row" justifyContent="flex-end" gap={1} marginTop={4}>
                            <Button variant="text" onPress={handleClose}>
                              Cancel
                            </Button>
                            <Button variant="contained" onPress={animateToTime}>
                              Next
                            </Button>
                          </Box>
                        )}
                      </>
                    )}
                  </StyledContent>
                </View>

                <View style={{ width: 360 }}>
                  <StyledContent>{currentView === 'time' && renderTimeView()}</StyledContent>
                </View>
              </Animated.View>
            </StyledPicker>
          </Pressable>
        </Pressable>
      </Modal>
    </StyledDateTimePicker>
  )
}
