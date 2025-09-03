export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-10">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 max-w-7xl text-center">
        <p className="text-xs text-muted-foreground">
          Instale o app para receber notificações dos jogos - Versão 1.0.3
        </p>
        <p className="text-xs text-muted-foreground">
          Desenvolvido por IA 🤖 | By{" "}
          <a
            href={process.env.NEXT_PUBLIC_GUTHUB_URL}
            target="_blank"
            className="hover:underline"
          >
            Evandro Carvalho Ferreira
          </a>
        </p>
      </div>
    </footer>
  );
}
