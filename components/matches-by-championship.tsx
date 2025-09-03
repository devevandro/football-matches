import { MatchCard } from "./match-card"

interface Match {
  championshipName: string;
  firstContestant: {
    badgePng: string;
    popularName: string;
    score?: number | null;
  };
  secondContestant: {
    badgePng: string;
    popularName: string;
    score?: number | null;
  };
  phase: string;
  location: string;
  startDate: string;
  startHour: string;
  moment?: "NOW" | "PAST" | "FUTURE";
};

interface MatchesByChampionshipProps {
  matches: Match[]
}

export function MatchesByChampionship({ matches }: MatchesByChampionshipProps) {
  const matchesByChampionship = matches.reduce(
    (acc, match) => {
      if (!acc[match.championshipName]) {
        acc[match.championshipName] = []
      }
      acc[match.championshipName].push(match)
      return acc
    },
    {} as Record<string, Match[]>,
  )

  return (
    <div className="space-y-8">
      {Object.entries(matchesByChampionship).map(([championshipName, championshipMatches]) => (
        <section key={championshipName} className="space-y-4">
          <div className="border-l-4 border-primary pl-4">
            <h2 className="text-xl font-semibold text-foreground">{championshipName}</h2>
            <p className="text-sm text-muted-foreground">
              {championshipMatches.length} jogo{championshipMatches.length > 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {championshipMatches.map((match, index) => (
              <MatchCard key={`${championshipName}-${index}`} match={match} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
