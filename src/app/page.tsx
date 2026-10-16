import { Code2, ExternalLink, Sparkles } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const t = useTranslations("App");

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="w-full max-w-6xl mx-auto flex h-14 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <Image
              className="dark:invert h-4 w-auto"
              src="/next.svg"
              alt="Next.js logo"
              width={80}
              height={16}
              priority
            />
            <span className="text-muted-foreground/60">/</span>
            <span className="text-sm font-semibold tracking-tight">
              template
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              render={
                <a
                  href="https://ui.shadcn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  shadcn/ui
                </a>
              }
            >
              shadcn/ui
            </Button>
            <Button
              variant="ghost"
              size="sm"
              render={
                <a
                  href="https://nextjs.org/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Next.js Docs
                </a>
              }
            >
              Next.js Docs
            </Button>
            <Button
              variant="outline"
              size="sm"
              render={
                <a
                  href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("deployNow")}
                </a>
              }
              className="gap-1.5"
            >
              <Image
                className="dark:invert h-3 w-3"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={12}
                height={12}
              />
              {t("deployNow")}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full max-w-4xl mx-auto px-4 py-16 sm:py-24 flex flex-col items-center text-center gap-6">
          <Badge variant="secondary" className="gap-2 px-3 py-1 text-xs">
            <Sparkles className="size-3.5 text-primary" />
            {t("badge")}
          </Badge>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
            {t("heroTitle")}{" "}
            <span className="underline decoration-primary/30 underline-offset-8">
              {t("heroTitleHighlight")}
            </span>
          </h1>

          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("heroDescription")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto justify-center">
            <Button
              size="lg"
              render={
                <a
                  href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("deployNow")}
                </a>
              }
              className="gap-2 font-medium"
            >
              <Image
                className="dark:invert h-3.5 w-3.5"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={14}
                height={14}
              />
              {t("deployNow")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={
                <a
                  href="https://ui.shadcn.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("documentation")}
                </a>
              }
              className="gap-2 font-medium"
            >
              <ExternalLink className="size-4" />
              {t("documentation")}
            </Button>
          </div>
        </section>

        {/* Quick Start Card */}
        <section className="w-full max-w-3xl mx-auto px-4 pb-12">
          <Card className="shadow-xs border-border/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Code2 className="size-4 text-primary" />
                <span>
                  {t("getStartedCardTitle")}{" "}
                  <Kbd className="font-mono text-xs px-1.5 py-0.5">
                    src/app/page.tsx
                  </Kbd>
                </span>
              </CardTitle>
              <CardDescription className="text-xs">
                {t("getStartedCardDescription")}
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        <Separator className="w-full max-w-4xl" />

        {/* Features Grid */}
        <section className="w-full max-w-4xl mx-auto px-4 py-12 flex flex-col gap-6">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {t("featuresTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card size="sm">
              <CardHeader>
                <CardTitle>{t("features.baseUi.title")}</CardTitle>
                <CardDescription>
                  {t("features.baseUi.description")}
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
                <CardTitle>{t("features.biome.title")}</CardTitle>
                <CardDescription>
                  {t("features.biome.description")}
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
        </section>

        <Separator className="w-full max-w-4xl" />

        {/* Component Showcase */}
        <section className="w-full max-w-4xl mx-auto px-4 py-12 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              {t("showcaseTitle")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("showcaseDescription")}
            </p>
          </div>

          <Card className="p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                Badges
              </span>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                Buttons
              </span>
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Default</Button>
                <Button size="sm" variant="secondary">
                  Secondary
                </Button>
                <Button size="sm" variant="outline">
                  Outline
                </Button>
                <Button size="sm" variant="ghost">
                  Ghost
                </Button>
                <Button size="sm" variant="destructive">
                  Destructive
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        shadcn-template &copy; 2026 &middot; Built with Next.js, Base UI &amp;
        Tailwind CSS v4
      </footer>
    </div>
  );
}
