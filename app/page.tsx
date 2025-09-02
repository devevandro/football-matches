import { MatchesByChampionship } from "@/components/matches-by-championship"
import puppeteer from "puppeteer";

function extractMatches(data) {
  const result = [];

  data.championshipsAgenda.forEach((agenda) => {
    const allMatches = [...(agenda.future || []), ...(agenda.now || [])];

    allMatches.forEach((event) => {
      const match = event.match;

      if (match.moment === "PAST") return;

      result.push({
        championshipName: agenda.championship.name,
        firstContestant: {
          badgePng: match.firstContestant.badgePng,
          popularName: match.firstContestant.popularName,
        },
        secondContestant: {
          badgePng: match.secondContestant.badgePng,
          popularName: match.secondContestant.popularName,
        },
        phase:
          (match.round !== null ? `Rodada ${match.round} - ` : "") +
          `${match.phase.name}`,
        location: match.location.popularName,
        startDate: new Date(match.startDate).toISOString().split("T")[0],
        startHour: match.startHour,
      });
    });
  });

  return result;
}

function getSportsSchedule() {
  const url = "https://ge.globo.com/agenda/#/futebol/";

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  const sportsData = await page.evaluate(() => {
    return window.dataSportsSchedule?.sport || null;
  });

  await browser.close();
  const today = new Date().toISOString().split("T")[0];
  let todayMatches;

  if (sportsData) {
    const sportsDataToday = sportsData[today];
    const filtered = extractMatches(sportsDataToday);

    todayMatches = filtered.filter(
      (m) => m.startDate === today
    );
  }

  return todayMatches;
}

// Sample data - replace with your actual data source
const matchesData = getSportsSchedule();

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
