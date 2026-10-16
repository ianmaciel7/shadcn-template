import { BookOpen, Sparkles } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Home() {
  const t = useTranslations("App");

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-12 md:p-16 bg-background text-foreground">
      <header className="w-full max-w-4xl flex justify-between items-center py-4 border-b">
        <Image
          className="dark:invert h-5 w-[100px]"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <Badge variant="secondary" className="gap-1.5 px-3 py-1">
          <Sparkles className="size-3.5" />
          {t("badge")}
        </Badge>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-10 max-w-3xl py-12 w-full">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("getStarted")}{" "}
            <code className="rounded-md bg-muted px-2 py-1 font-mono text-sm border">
              {t("file")}
            </code>
          </h1>
          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
            {t("subtext")}{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
            >
              {t("templates")}
            </a>{" "}
            {t("center")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center justify-center">
          <a
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "w-full sm:w-44 gap-2",
            )}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert size-4"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            {t("deployNow")}
          </a>
          <a
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full sm:w-44 gap-2",
            )}
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BookOpen className="size-4" />
            {t("documentation")}
          </a>
        </div>

        <div className="w-full pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card size="sm">
              <CardHeader>
                <CardTitle>{t("features.biome.title")}</CardTitle>
                <CardDescription>
                  {t("features.biome.description")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card size="sm">
              <CardHeader>
                <CardTitle>{t("features.compiler.title")}</CardTitle>
                <CardDescription>
                  {t("features.compiler.description")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card size="sm">
              <CardHeader>
                <CardTitle>{t("features.shadcn.title")}</CardTitle>
                <CardDescription>
                  {t("features.shadcn.description")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card size="sm">
              <CardHeader>
                <CardTitle>{t("features.i18n.title")}</CardTitle>
                <CardDescription>
                  {t("features.i18n.description")}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </main>

      <footer className="w-full max-w-4xl py-4 border-t text-center text-sm text-muted-foreground">
        shadcn-template &copy; 2026 &middot; Next.js &amp; shadcn/ui
      </footer>
    </div>
  );
}
