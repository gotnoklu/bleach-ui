import { useState } from 'react'
import { styled } from '@bleach/ui/dist/theme/utilities'
import Box, { type BoxProps } from '@bleach/ui/dist/components/Box'
import Typography from '@bleach/ui/dist/components/Typography'
import DateTimePicker from '@bleach/ui/dist/components/DateTimePicker'

const Section = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(4) }))
const SubSection = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(2) }))

export default function DateTimePickerShowcase() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [dateOnly, setDateOnly] = useState<Date | undefined>(undefined)
  const [timeOnly, setTimeOnly] = useState<Date | undefined>(undefined)

  return (
    <Section>
      <Typography variant="h5">Date Time Picker</Typography>

      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Basic Usage
        </Typography>
        <DateTimePicker
          label="Select Date & Time"
          description="Click to select both date and time"
          value={date}
          onChange={setDate}
          fullWidth
        />
      </SubSection>

      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Date Only
        </Typography>
        <DateTimePicker
          label="Select Date"
          description="Click to select date only"
          value={dateOnly}
          onChange={setDateOnly}
          view="date"
          format="MM/dd/yyyy"
          fullWidth
        />
      </SubSection>

      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Time Only
        </Typography>
        <DateTimePicker
          label="Select Time"
          description="Click to select time only"
          value={timeOnly}
          onChange={setTimeOnly}
          view="time"
          format="HH:mm"
          fullWidth
        />
      </SubSection>

      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Variants
        </Typography>
        <Box style={{ gap: 8 }}>
          <DateTimePicker label="Outlined (Default)" value={date} onChange={setDate} fullWidth />
          <DateTimePicker
            variant="filled"
            label="Filled"
            value={date}
            onChange={setDate}
            fullWidth
          />
        </Box>
      </SubSection>

      <SubSection>
        <Typography variant="h6" color="text.secondary">
          States
        </Typography>
        <Box style={{ gap: 8 }}>
          <DateTimePicker label="Disabled" value={date} onChange={setDate} disabled fullWidth />
          <DateTimePicker label="Invalid" value={date} onChange={setDate} isInvalid fullWidth />
        </Box>
      </SubSection>

      <SubSection>
        <Typography variant="h6" color="text.secondary">
          With Min/Max Date
        </Typography>
        <DateTimePicker
          label="Select Date"
          value={date}
          onChange={setDate}
          minDate={new Date(2024, 0, 1)}
          maxDate={new Date(2024, 11, 31)}
          description="Only dates in 2024 are allowed"
          fullWidth
        />
      </SubSection>
    </Section>
  )
}
