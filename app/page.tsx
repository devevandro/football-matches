"use client";
import { useEffect, useState } from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { MatchesByChampionship } from "@/components/matches-by-championship";
import { Match } from "@/lib/sports";
import { LoadingScreen } from "@/components/loading-screen";
import { ErrorScreen } from "@/components/error-screen";

type FilterType = "ALL" | "NOW" | "FUTURE" | "PAST";

export default function HomePage() {
  const [matchesData, setMatchesData] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");

  const loadMatches = () => {
    setIsLoading(true);
    setHasError(false);

    const timer = setTimeout(() => {
      const shouldError = Math.random() < 0.2;

      if (shouldError) {
        setHasError(true);
      }
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    loadMatches();
  }, []);

  useEffect(() => {
    const fetchMatches = async (): Promise<void> => {
      const res = await fetch("/api/sports");
      const data = await res.json();
      setMatchesData(data);
    };

    fetchMatches()
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
        setIsLoading(false);
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const getFilteredMatches = () => {
    if (activeFilter === "ALL") return matchesData;
    return matchesData.filter((match) => match.moment === activeFilter);
  };

  const getMatchCount = (filter: FilterType) => {
    if (filter === "ALL") return matchesData.length;
    return matchesData.filter((match) => match.moment === filter).length;
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (hasError) {
    return <ErrorScreen />;
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      <Header
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        getMatchCount={getMatchCount}
      />
      <main className="flex-1 overflow-y-auto pt-[180px] pb-[80px]">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-7xl">
          <MatchesByChampionship matches={getFilteredMatches()} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
