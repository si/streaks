import { Progress } from "@/components/ui/progress"

interface StepperProps {
  currentStep: number
  totalSteps: number
}

export function Stepper({ currentStep, totalSteps }: StepperProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(progress)}% complete</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}