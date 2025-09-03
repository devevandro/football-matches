export default function HeaderBadges() {
  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground border-b border-border pb-3 mb-1">
      <span className="flex items-center gap-1">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
        Ao vivo
      </span>
      <span className="flex items-center gap-1">
        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
        Hoje
      </span>
      <span className="flex items-center gap-1">
        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
        Encerrado
      </span>
    </div>
  );
}
