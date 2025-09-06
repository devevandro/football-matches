import vm from "vm";

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
  channelName?: string;
  channelImage?: string;
};

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
        location: match?.location !== null ? match.location.popularName : "",
        startDate: match.startDate,
        startHour: match.startHour,
        moment: match.moment,
        channelName:
          match?.liveWatchSources !== null
            ? match?.liveWatchSources[0].name
            : "",
        channelImage:
          match?.liveWatchSources !== null
            ? match?.liveWatchSources[0].officialLogoUrl
            : "",
      });
    });
  });

  return result;
};

export const getSportsSchedule = async (): Promise<Match[]> => {
  const url = process.env.NEXT_PUBLIC_URL || "";

  const res = await fetch(url);
  const html = await res.text();

  const regex = /window\.dataSportsSchedule\s*=\s*(\{[\s\S]*?\});/;
  const match = html.match(regex);

  if (!match || match.length < 2) {
    throw new Error("Não foi possível extrair dataSportsSchedule do HTML");
  }

  const sandbox = {} as any;
  vm.createContext(sandbox);
  vm.runInContext(`data = ${match[1]}`, sandbox);

  const dataSportsSchedule = sandbox.data;
  const sportsData = dataSportsSchedule.sport;

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const todayKey = `${year}-${month}-${day}`;

  const sportsDataToday = sportsData[todayKey];
  if (!sportsDataToday) return [];

  return extractMatches(sportsDataToday);
};
