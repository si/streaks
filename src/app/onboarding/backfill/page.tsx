'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/forms/FormField'
import { backfillSchema, type BackfillFormData } from '@/lib/validation'
import { LookbackPeriod } from '@prisma/client'

const backfillOptions = [
  {
    value: LookbackPeriod.THIS_YEAR,
    label: 'This year',
    description: 'Get data from January 1st onwards',
    emoji: '📅',
  },
  {
    value: LookbackPeriod.DAYS_30,
    label: 'Last 30 days',
    description: 'Recent activity from the past month',
    emoji: '📊',
  },
  {
    value: LookbackPeriod.ALL,
    label: 'All time',
    description: 'Everything we can find (may take longer)',
    emoji: '📚',
  },
]

export default function BackfillPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<BackfillFormData>({
    resolver: zodResolver(backfillSchema),
    defaultValues: {
      lookbackPeriod: LookbackPeriod.THIS_YEAR,
    },
  })

  const onSubmit = async (data: BackfillFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/onboarding/backfill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push('/onboarding/preview')
      } else {
        console.error('Failed to save backfill selection')
      }
    } catch (error) {
      console.error('Error saving backfill:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold">How far back should we look?</h2>
        <p className="text-muted-foreground">
          Choose how much historical data to include in your timeline
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField name="lookbackPeriod">
          <div className="grid gap-3">
            {backfillOptions.map((option) => (
              <Card
                key={option.value}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  form.watch('lookbackPeriod') === option.value
                    ? 'ring-2 ring-primary'
                    : ''
                }`}
                onClick={() => form.setValue('lookbackPeriod', option.value)}
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

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Continue'}
        </Button>
      </form>
    </div>
  )
}