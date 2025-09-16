'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FormField } from '@/components/forms/FormField'
import { goalSchema, type GoalFormData } from '@/lib/validation'
import { GoalCategory, LookbackPeriod } from '@prisma/client'

const goalOptions = [
  {
    value: GoalCategory.FITNESS,
    label: 'Fitness & Health',
    description: 'Track your workouts, runs, and physical activities',
    emoji: '🏃',
  },
  {
    value: GoalCategory.CREATIVITY,
    label: 'Creativity',
    description: 'Monitor your creative projects and artistic pursuits',
    emoji: '🎨',
  },
  {
    value: GoalCategory.ENTERTAINMENT,
    label: 'Entertainment',
    description: 'Keep track of your music, films, and media consumption',
    emoji: '🎬',
  },
  {
    value: GoalCategory.PRODUCTIVITY,
    label: 'Productivity',
    description: 'Track your work, projects, and professional growth',
    emoji: '💻',
  },
  {
    value: GoalCategory.LIFE_SOCIAL,
    label: 'Life & Social',
    description: 'Record your social activities and life events',
    emoji: '📍',
  },
]

export default function GoalPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<GoalFormData>({
      resolver: zodResolver(goalSchema) as any,
      defaultValues: {
        goalCategory: undefined,
        commsOptIn: false,
        lookbackPeriod: LookbackPeriod.THIS_YEAR,
      },
    })

  const onSubmit = async (data: GoalFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/onboarding/goal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push('/onboarding/services')
      } else {
        console.error('Failed to save goal')
      }
    } catch (error) {
      console.error('Error saving goal:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold">What's your main goal?</h2>
        <p className="text-muted-foreground">
          Choose the category that best describes what you want to track
        </p>
      </div>

        <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-6">
        <FormField name="goalCategory">
          <div className="grid gap-3">
            {goalOptions.map((option) => (
              <Card
                key={option.value}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  form.watch('goalCategory') === option.value
                    ? 'ring-2 ring-primary'
                    : ''
                }`}
                onClick={() => form.setValue('goalCategory', option.value)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <span className="text-2xl">{option.emoji}</span>
                    <span>{option.label}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </FormField>

        <FormField name="lookbackPeriod" label="How far back should we look?">
          <Select
            value={form.watch('lookbackPeriod')}
            onValueChange={(value) => form.setValue('lookbackPeriod', value as LookbackPeriod)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={LookbackPeriod.THIS_YEAR}>This year</SelectItem>
              <SelectItem value={LookbackPeriod.DAYS_30}>Last 30 days</SelectItem>
              <SelectItem value={LookbackPeriod.ALL}>All time</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField name="commsOptIn">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="commsOptIn"
              checked={form.watch('commsOptIn')}
              onCheckedChange={(checked) => form.setValue('commsOptIn', checked as boolean)}
            />
            <label
              htmlFor="commsOptIn"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Send me updates about new features and improvements
            </label>
          </div>
        </FormField>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Continue'}
        </Button>
      </form>
    </div>
  )
}