import { MatchesByChampionship } from "@/components/matches-by-championship"

// Sample data - replace with your actual data source
const matchesData = [
  {
    championshipName: "Campeonato Brasileiro Série B",
    firstContestant: {
      badgePng: "https://s.sde.globo.com/media/organizations/2024/05/07/AMRICA-mg-30.png",
      popularName: "América-MG",
    },
    secondContestant: {
      badgePng: "https://s.sde.globo.com/media/organizations/2024/05/12/avai30.png",
      popularName: "Avaí",
    },
    phase: "Rodada 24 - Fase única",
    location: "Independência",
    startDate: "2025-09-02",
    startHour: "19:30:00",
  },
  {
    championshipName: "Campeonato Brasileiro sub-17",
    firstContestant: {
      badgePng: "https://s.sde.globo.com/media/organizations/2024/10/09/Corinthians-2024-30_AnBKqU3.png",
      popularName: "Corinthians",
    },
    secondContestant: {
      badgePng: "https://s.sde.globo.com/media/organizations/2014/04/14/palmeiras_30x30.png",
      popularName: "Palmeiras",
    },
    phase: "Rodada 17 - Primeira fase",
    location: "Santana de Parnaíba",
    startDate: "2025-09-02",
    startHour: "19:30:00",
  },
  {
    championshipName: "Campeonato Brasileiro sub-17",
    firstContestant: {
      badgePng: "https://s.sde.globo.com/media/organizations/2020/07/02/atletico-go-2020-30.png",
      popularName: "Atlético-GO",
    },
    secondContestant: {
      badgePng: "https://s.sde.globo.com/media/organizations/2021/09/04/ESCUDO-VASCO-RGB_30px.png",
      popularName: "Vasco",
    },
    phase: "Rodada 17 - Primeira fase",
    location: "Antônio Accioly",
    startDate: "2025-09-02",
    startHour: "15:00:00",
  },
  {
    championshipName: "Campeonato Brasileiro sub-17",
    firstContestant: {
      badgePng: "https://s.sde.globo.com/media/organizations/2014/04/14/bahia_30x30.png",
      popularName: "Bahia",
    },
    secondContestant: {
      badgePng: "https://s.sde.globo.com/media/organizations/2024/05/07/AMRICA-mg-30.png",
      popularName: "América-MG",
    },
    phase: "Rodada 17 - Primeira fase",
    location: "CT Evaristo de Macedo",
    startDate: "2025-09-02",
    startHour: "15:00:00",
  },
  {
    championshipName: "Campeonato Brasileiro sub-17",
    firstContestant: {
      badgePng: "https://s.sde.globo.com/media/organizations/2014/04/14/sao_paulo_30x30.png",
      popularName: "São Paulo",
    },
    secondContestant: {
      badgePng: "https://s.sde.globo.com/media/organizations/2014/04/16/cuiaba30_.png",
      popularName: "Cuiabá",
    },
    phase: "Rodada 17 - Primeira fase",
    location: "Cotia",
    startDate: "2025-09-02",
    startHour: "15:00:00",
  },
  {
    championshipName: "Campeonato Acreano Segunda Divisão",
    firstContestant: {
      badgePng: "https://s.sde.globo.com/media/organizations/2021/12/13/andira_30.png",
      popularName: "Andirá",
    },
    secondContestant: {
      badgePng: "https://s.sde.globo.com/media/organizations/2024/11/23/peq.png",
      popularName: "Santa Cruz-AC",
    },
    phase: "Rodada 4 - Primeira fase",
    location: "Arena da Floresta",
    startDate: "2025-09-02",
    startHour: "18:00:00",
  },
  {
    championshipName: "Copa Paulista",
    firstContestant: {
      badgePng: "https://s.sde.globo.com/media/organizations/2012/01/05/comercial_sp_30.png",
      popularName: "Comercial-SP",
    },
    secondContestant: {
      badgePng: "https://s.sde.globo.com/media/teams/2015/01/11/intlim1.png",
      popularName: "Inter de Limeira",
    },
    phase: "Oitavas de final",
    location: "Palma Travassos",
    startDate: "2025-09-02",
    startHour: "20:00:00",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Jogos de Hoje</h1>
          <p className="text-muted-foreground">Acompanhe os próximos jogos organizados por campeonato</p>
        </header>

        <MatchesByChampionship matches={matchesData} />
      </div>
    </div>
  )
}
