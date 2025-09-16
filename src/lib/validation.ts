import { z } from 'zod'
import { GoalCategory, LookbackPeriod } from '@prisma/client'

export const goalSchema = z.object({
  goalCategory: z.nativeEnum(GoalCategory),
  commsOptIn: z.boolean().default(false),
  lookbackPeriod: z.nativeEnum(LookbackPeriod).default('THIS_YEAR'),
})

export const backfillSchema = z.object({
  lookbackPeriod: z.nativeEnum(LookbackPeriod),
})

export type GoalFormInput = z.input<typeof goalSchema>
export type GoalFormData = z.output<typeof goalSchema>

export type BackfillFormInput = z.input<typeof backfillSchema>
export type BackfillFormData = z.output<typeof backfillSchema>
