export default function Footer() {
  return (
    <footer className="mt-8 pt-6 border-t border-border text-center">
      <p className="text-xs text-muted-foreground">
        Instale o app para receber notificações dos jogos
      </p>
      <p className="text-xs text-muted-foreground">
        Desenvolvido por IA 🤖 | By{" "}
        <a
          href="https://github.com/devevandro"
          target="_blank"
          className="hover:underline"
        >
          Evandro Carvalho Ferreira
        </a>
      </p>
    </footer>
  );
}
