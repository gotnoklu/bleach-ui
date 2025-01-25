import { useState, useCallback, type ReactNode } from 'react'
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

const StyledHeader = styled(View)((theme: Theme) => ({
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing.create(3),
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

const StyledButton = styled(Pressable)((_theme: Theme) => ({
  width: 40,
  height: 40,
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',
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
    const startYear = currentYear - 100
    const endYear = currentYear + 100

    for (let year = startYear; year <= endYear; year++) {
      const isSelected = year === selectedDate.getFullYear()
      const isCurrent = year === currentYear
      const isDisabled =
        (minDate && new Date(year, 11, 31) < minDate) || (maxDate && new Date(year, 0, 1) > maxDate)

      years.push(
        <StyledYearCell key={year}>
          <Button
            variant={isSelected ? 'contained' : 'text'}
            onPress={() => {
              if (!isDisabled) {
                setCurrentYear(year)
                setCalendarView('months')
              }
            }}
            disabled={isDisabled}
            style={{
              width: '100%',
              height: 40,
              backgroundColor: isSelected
                ? theme.palette.primary.main
                : isCurrent
                  ? theme.palette.primary.light
                  : 'transparent',
              opacity: isDisabled ? 0.5 : 1,
            }}
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
      <ScrollView
        style={{ maxHeight: 300 }}
        showsVerticalScrollIndicator={false}
        contentOffset={{ x: 0, y: Math.floor((selectedDate.getFullYear() - startYear) / 3) * 40 }}
      >
        <StyledYearGrid>{years}</StyledYearGrid>
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
      const isSelected =
        index === selectedDate.getMonth() && currentYear === selectedDate.getFullYear()
      const isCurrent = index === currentMonth
      months.push(
        <StyledMonthCell key={month}>
          <Button
            variant={isSelected ? 'contained' : 'text'}
            onPress={() => {
              setCurrentMonth(index)
              setCalendarView('days')
            }}
            style={{
              width: '100%',
              height: 36,
              backgroundColor: isSelected
                ? theme.palette.secondary.main
                : isCurrent
                  ? theme.palette.primary.main
                  : 'transparent',
            }}
          >
            <Typography
              variant="body2"
              color={isSelected ? 'primary.text' : isCurrent ? 'primary.text' : 'text.primary'}
            >
              {month.substring(0, 3)}
            </Typography>
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
          <StyledButton
            onPress={() => !isDisabled && handleDateSelect(currentDate)}
            disabled={isDisabled}
            style={{
              backgroundColor: isSelected
                ? theme.palette.primary.main
                : isToday
                  ? theme.palette.primary.light
                  : 'transparent',
              opacity: isDisabled ? 0.5 : 1,
            }}
          >
            <Typography
              variant="body2"
              color={
                isSelected
                  ? 'primary.text'
                  : isDisabled
                    ? 'disabled'
                    : isToday
                      ? 'primary.main'
                      : 'text.primary'
              }
            >
              {i}
            </Typography>
          </StyledButton>
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
      <Box row style={{ gap: 16 }}>
        <Box style={{ flex: 1 }}>
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
        <Box style={{ flex: 1 }}>
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
        row
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <Button variant="text" onPress={animateToDate}>
          <Icon name="arrow-left" size={24} color="text.secondary" />
        </Button>
        <Typography variant="h6">Select time</Typography>
        <Box style={{ width: 40 }} />
      </Box>

      {renderTimePicker()}

      <Box
        row
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

  const getHeaderText = () => {
    if (currentView === 'date') {
      return new Date(currentYear, currentMonth).toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      })
    }
    return formatDate(selectedDate)
  }

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
              <StyledHeader>
                <Typography variant="h6" color="primary.text">
                  {getHeaderText()}
                </Typography>
              </StyledHeader>

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
                          row
                          style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 16,
                          }}
                        >
                          {calendarView === 'days' && (
                            <>
                              <Button
                                variant="text"
                                onPress={() => setCalendarView('years')}
                                style={{ minWidth: 120 }}
                              >
                                <Typography variant="h6">
                                  {new Date(currentYear, currentMonth).toLocaleString('default', {
                                    month: 'long',
                                    year: 'numeric',
                                  })}
                                </Typography>
                              </Button>
                              <Box row style={{ gap: 8 }}>
                                <Button
                                  variant="text"
                                  onPress={() => {
                                    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))
                                    if (currentMonth === 0) {
                                      setCurrentYear((prev) => prev - 1)
                                    }
                                  }}
                                  style={{ width: 40, height: 40, borderRadius: 20 }}
                                >
                                  <Icon name="chevron-left" size={24} color="text.secondary" />
                                </Button>
                                <Button
                                  variant="text"
                                  onPress={() => {
                                    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))
                                    if (currentMonth === 11) {
                                      setCurrentYear((prev) => prev + 1)
                                    }
                                  }}
                                  style={{ width: 40, height: 40, borderRadius: 20 }}
                                >
                                  <Icon name="chevron-right" size={24} color="text.secondary" />
                                </Button>
                              </Box>
                            </>
                          )}
                          {calendarView === 'years' && (
                            <Typography variant="h6" style={{ width: '100%', textAlign: 'center' }}>
                              Select year
                            </Typography>
                          )}
                          {calendarView === 'months' && (
                            <Button
                              variant="text"
                              onPress={() => setCalendarView('years')}
                              style={{ width: '100%' }}
                            >
                              <Typography variant="h6" style={{ textAlign: 'center' }}>
                                {currentYear}
                              </Typography>
                            </Button>
                          )}
                        </Box>

                        {calendarView === 'days' && renderCalendar()}
                        {calendarView === 'years' && renderYears()}
                        {calendarView === 'months' && renderMonths()}

                        {view === 'datetime' && calendarView === 'days' && (
                          <Box
                            row
                            style={{
                              justifyContent: 'flex-end',
                              gap: 8,
                              marginTop: 16,
                              borderTopWidth: 1,
                              borderTopColor: theme.palette.divider,
                              paddingTop: 16,
                            }}
                          >
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
