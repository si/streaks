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

export type GoalFormData = z.infer<typeof goalSchema>
export type BackfillFormData = z.infer<typeof backfillSchema>