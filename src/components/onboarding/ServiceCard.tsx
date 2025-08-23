import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Provider } from "@/lib/providers"
import Link from "next/link"

interface ServiceCardProps {
  provider: Provider
  href: string
}

export function ServiceCard({ provider, href }: ServiceCardProps) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-lg">
          <span className="text-2xl">{provider.emoji}</span>
          <span>{provider.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {provider.description}
        </p>
        <Button asChild className="w-full">
          <Link href={href}>
            {provider.oauthSupported ? 'Connect and continue' : 'Connect'}
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}