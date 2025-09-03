import HeaderBadges from "./header-badges";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b border-border z-10">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 max-w-7xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Futebol pelo Brasil - {new Date().toLocaleDateString("pt-BR")}
            </h1>
          </div>
        </div>
      </div>
      <HeaderBadges />
    </header>
  );
}
