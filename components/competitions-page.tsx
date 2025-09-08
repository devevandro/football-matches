"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LoadingScreen } from "./loading-screen";

export function CompetitionsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [competitionsData, setCompetitionsData] = useState<{
    [key: string]: { name: string; image: string | null; url: string }[];
  }>({});

  useEffect(() => {
    const fetchTables = async (): Promise<void> => {
      const res = await fetch("/api/tables");
      const data = await res.json();
      setCompetitionsData(data);
    };

    fetchTables()
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
      return <LoadingScreen message="Carregando as competições" />;
    }

  return (
    <div className="space-y-6">
      {Object.entries(competitionsData).map(([category, competitions]) => (
        <div key={category} className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {competitions.map((competition) => (
              <a
                key={competition.name}
                href={competition.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
              >
                <Image
                  src={competition.image || "/placeholder.svg"}
                  alt={competition.name}
                  width={30}
                  height={30}
                  className="flex-shrink-0"
                />
                <span className="text-sm font-medium text-foreground truncate">
                  {competition.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
