import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export async function IntlProvider({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  const locale = await getLocale();
  return (
    <NextIntlClientProvider>
      <div lang={locale} className={cn("contents", className)} {...props}>
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
