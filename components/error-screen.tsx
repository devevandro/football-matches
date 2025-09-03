"use client"

export function ErrorScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <div className="text-8xl mb-4 animate-pulse opacity-50">🥅</div>
          <div className="text-6xl mb-6 transform rotate-12 opacity-60">⚽</div>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-4">Ops! Algo deu errado</h1>

        <p className="text-muted-foreground mb-8 leading-relaxed">
          Não foi possível carregar os dados dos jogos. Verifique sua conexão e tente novamente.
        </p>

        <div className="mt-6 text-xs text-muted-foreground">Se o problema persistir, tente recarregar a página daqui 10 minutos</div>
      </div>
    </div>
  )
}
