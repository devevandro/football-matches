import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Clock } from "lucide-react"
import Image from "next/image"

interface Match {
  championshipName: string
  firstContestant: {
    badgePng: string
    popularName: string
  }
  secondContestant: {
    badgePng: string
    popularName: string
  }
  phase: string
  location: string
  startDate: string
  startHour: string
}

interface MatchCardProps {
  match: Match
}

export function MatchCard({ match }: MatchCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5) // Remove seconds
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <Badge variant="secondary" className="w-fit text-xs">
          {match.phase}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Teams */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src={match.firstContestant.badgePng || "/placeholder.svg"}
                alt={`${match.firstContestant.popularName} logo`}
                fill
                className="object-contain"
              />
            </div>
            <span className="font-medium text-sm truncate">{match.firstContestant.popularName}</span>
          </div>

          <div className="px-3 py-1 bg-muted rounded-md mx-2 flex-shrink-0">
            <span className="text-xs font-bold text-muted-foreground">VS</span>
          </div>

          <div className="flex items-center space-x-3 flex-1 justify-end">
            <span className="font-medium text-sm truncate">{match.secondContestant.popularName}</span>
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src={match.secondContestant.badgePng || "/placeholder.svg"}
                alt={`${match.secondContestant.popularName} logo`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Match Details */}
        <div className="space-y-2 pt-2 border-t">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <CalendarDays className="w-3 h-3" />
            <span>{formatDate(match.startDate)}</span>
            <Clock className="w-3 h-3 ml-2" />
            <span>{formatTime(match.startHour)}</span>
          </div>

          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{match.location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
