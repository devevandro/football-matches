type FilterType = "ALL" | "NOW" | "FUTURE" | "PAST";

type HeaderProps = {
  setActiveFilter: (filter: FilterType) => void;
  activeFilter: FilterType;
  getMatchCount: (filter: FilterType) => number;
}

export default function Header({ setActiveFilter, activeFilter, getMatchCount }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b border-border z-10">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 max-w-7xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Futebol pelo Mundo {new Date().toLocaleDateString("pt-BR")}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Acompanhe resultados do jogos em tempo real
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 pb-3">
          <button
            onClick={() => setActiveFilter("ALL")}
            className={`cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeFilter === "ALL"
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
            Todos ({getMatchCount("ALL")})
          </button>

          <button
            onClick={() => setActiveFilter("NOW")}
            className={`cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeFilter === "NOW"
                ? "bg-green-500 text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            Ao vivo ({getMatchCount("NOW")})
          </button>

          <button
            onClick={() => setActiveFilter("FUTURE")}
            className={`cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeFilter === "FUTURE"
                ? "bg-blue-500 text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            Hoje ({getMatchCount("FUTURE")})
          </button>

          <button
            onClick={() => setActiveFilter("PAST")}
            className={`cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeFilter === "PAST"
                ? "bg-gray-500 text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
            Encerrado ({getMatchCount("PAST")})
          </button>
        </div>
      </div>
    </header>
  );
}
