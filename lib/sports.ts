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

  const res = await fetch(url);
  const html = await res.text();

  const regex = /window\.dataSportsSchedule\s*=\s*(\{.*?\});/s;
  const match = html.match(regex);

  if (!match || match.length < 2) {
    throw new Error("Não foi possível extrair dataSportsSchedule do HTML");
  }

  const dataSportsSchedule = JSON.parse(match[1]);
  const sportsData = dataSportsSchedule.sport;

  const today = new Date().toLocaleDateString("pt-BR").replace(/\//g, "-");
  const [day, month, year] = today.split("-");
  const invertedDate = `${year}-${month}-${day}`;

  const sportsDataToday = sportsData[invertedDate];
  if (!sportsDataToday) return [];

  return extractMatches(sportsDataToday);
};
