import HeaderBadges from "./header-badges";

export default function Header() {
  return (
    <header className="mb-6 sm:mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Futebol pelo Brasil - {new Date().toLocaleDateString("pt-BR")}
          </h1>
        </div>
      </div>
      <HeaderBadges />
    </header>
  );
}
