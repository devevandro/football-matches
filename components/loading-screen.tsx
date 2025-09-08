type LoadingScreenProps = {
  message: string;
}

export function LoadingScreen({ message }: LoadingScreenProps) {
  const isComptetions = message.toLowerCase().includes("competições");

  return (
    <div
      className={`${
        isComptetions
          ? "flex flex-col items-center justify-center py-60 space-y-8"
          : "h-screen"
      } bg-background flex flex-col items-center justify-center`}
    >
      <div className="text-center">
        <div className="mb-6">
          <div className="text-6xl animate-bounce">⚽</div>
        </div>
        <p className="text-lg font-medium text-foreground">{message}</p>
        <div className="flex justify-center mt-4">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
