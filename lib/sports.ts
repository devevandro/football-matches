import puppeteer from "puppeteer";

export type Match = {
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
}

const extractMatches = (data: any): Match[] => {
  const result: Match[] = [];

  data.championshipsAgenda.forEach((agenda: any) => {
    const allMatches = [
      ...(agenda.future || []),
      ...(agenda.now || []),
      ...(agenda.past || []),
    ];

    allMatches.forEach((event: any) => {
      const match = event.match;

      result.push({
        championshipName: agenda.championship.name,
        firstContestant: {
          badgePng: match.firstContestant.badgePng,
          popularName: match.firstContestant.popularName,
          score: match.scoreboard ? match.scoreboard.home : "",
        },
        secondContestant: {
          badgePng: match.secondContestant.badgePng,
          popularName: match.secondContestant.popularName,
          score: match.scoreboard ? match.scoreboard.away : "",
        },
        phase:
          (match.round !== null ? `Rodada ${match.round} - ` : "") +
          `${match.phase.name}`,
        location: match.location.popularName,
        startDate: match.startDate,
        startHour: match.startHour,
        moment: match.moment,
      });
    });
  });

  return result;
};

export const getSportsSchedule = async (): Promise<Match[]> => {
  const url = process.env.NEXT_PUBLIC_URL || "";

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  const sportsData = await page.evaluate(() => {
    return (window as any).dataSportsSchedule?.sport || null;
  });

  await browser.close();

  const today = new Date().toLocaleDateString("pt-BR").replace(/\//g, "-");

  const [day, month, year] = today.split("-");
  const invertedDate = `${year}-${month}-${day}`;

  const sportsDataToday = sportsData[invertedDate];
  const filtered = extractMatches(sportsDataToday);
  return filtered;
};
