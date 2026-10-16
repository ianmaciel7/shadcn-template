import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";

export default function Home() {
  const t = useTranslations("App");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-24 sm:py-32 px-8 sm:px-16 sm:items-start">
        <div className="flex items-center gap-3">
          <Image
            className="dark:invert h-5 w-[100px]"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
          <Badge variant="secondary" className="text-xs font-normal">
            template
          </Badge>
        </div>

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-md text-3xl font-semibold leading-10 tracking-tight text-foreground sm:text-4xl">
            {t("getStartedPrefix")}{" "}
            <Kbd className="rounded-md bg-muted px-2 py-1 font-mono text-sm font-semibold text-foreground border border-border h-auto">
              page.tsx
            </Kbd>{" "}
            {t("getStartedSuffix")}
          </h1>
          <p className="max-w-md text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground">
            {t("instructionsPrefix")}{" "}
            <Button
              variant="link"
              nativeButton={false}
              render={
                <Link
                  href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("templates")}
                </Link>
              }
              className="p-0 h-auto font-medium text-foreground underline underline-offset-4 hover:text-primary inline-flex"
            >
              {t("templates")}
            </Button>{" "}
            {t("instructionsMiddle")}{" "}
            <Button
              variant="link"
              nativeButton={false}
              render={
                <Link
                  href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("learning")}
                </Link>
              }
              className="p-0 h-auto font-medium text-foreground underline underline-offset-4 hover:text-primary inline-flex"
            >
              {t("learning")}
            </Button>{" "}
            {t("instructionsSuffix")}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row w-full sm:w-auto">
          <Button
            nativeButton={false}
            render={
              <Link
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("deployNow")}
              />
            }
            className="h-11 sm:h-12 w-full sm:w-[160px] gap-2 rounded-lg px-5 text-sm sm:text-base font-medium shadow-xs"
          >
            <Image
              className="dark:invert h-4 w-4"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={14}
            />
            {t("deployNow")}
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={
              <Link
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("documentation")}
              />
            }
            className="h-11 sm:h-12 w-full sm:w-[160px] rounded-lg px-5 text-sm sm:text-base font-medium shadow-xs"
          >
            {t("documentation")}
          </Button>
        </div>
      </main>
    </div>
  );
}
