import { Box } from '@bleach/ui/components/box'
import { DateTimePicker } from '@bleach/ui/components/date-time-picker'
import { Text } from '@bleach/ui/components/text'
import { useState } from 'react'
import { Section, SubSection } from '../../components/section'

export default function DateTimePickerShowcase() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [dateOnly, setDateOnly] = useState<Date | undefined>(undefined)
  const [timeOnly, setTimeOnly] = useState<Date | undefined>(undefined)

  return (
    <Section>
      <Text variant="xl">Date Time Picker</Text>

      <SubSection>
        <Text variant="lg" color="text.secondary">
          Basic Usage
        </Text>
        <DateTimePicker
          label="Select Date & Time"
          description="Click to select both date and time"
          value={date}
          onChange={setDate}
          fullWidth
        />
      </SubSection>

      <SubSection>
        <Text variant="lg" color="text.secondary">
          Date Only
        </Text>
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
        <Text variant="lg" color="text.secondary">
          Time Only
        </Text>
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
        <Text variant="lg" color="text.secondary">
          Variants
        </Text>
        <Box style={{ gap: 8 }}>
          <DateTimePicker label="Outlined (Default)" value={date} onChange={setDate} fullWidth />
          <DateTimePicker variant="filled" label="Filled" value={date} onChange={setDate} fullWidth />
        </Box>
      </SubSection>

      <SubSection>
        <Text variant="lg" color="text.secondary">
          States
        </Text>
        <Box style={{ gap: 8 }}>
          <DateTimePicker label="Disabled" value={date} onChange={setDate} disabled fullWidth />
          <DateTimePicker label="Invalid" value={date} onChange={setDate} isInvalid fullWidth />
        </Box>
      </SubSection>

      <SubSection>
        <Text variant="lg" color="text.secondary">
          With Min/Max Date
        </Text>
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
