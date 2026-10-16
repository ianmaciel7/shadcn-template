import Image from "next/image";
import { useTranslations } from "next-intl";
import { ModeToggle } from "@/components/ui/extensions/mode-toggle";

export default function Home() {
  const t = useTranslations("App");

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-8 bg-background text-foreground">
      <header className="w-full max-w-4xl flex justify-between items-center py-4 border-b">
        <Image
          className="dark:invert h-5 w-[100px]"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-6 text-center max-w-2xl py-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground">{t("description")}</p>
      </main>

      <footer className="w-full max-w-4xl py-4 border-t text-center text-sm text-muted-foreground">
        shadcn-template &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
