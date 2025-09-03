"use client";
import { useEffect, useState } from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { MatchesByChampionship } from "@/components/matches-by-championship";
import { Match } from "@/lib/sports";
import { LoadingScreen } from "@/components/loading-screen";
import { ErrorScreen } from "@/components/error-screen";

export default function HomePage() {
  const [matchesData, setMatchesData] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState(false);

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

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (hasError) {
    return <ErrorScreen />
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl">
        <Header />
        <MatchesByChampionship matches={matchesData} />
        <Footer />
      </div>
    </div>
  );
}
