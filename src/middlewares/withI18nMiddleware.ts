import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { CustomMiddleware } from "./chain";
import { i18n } from "@config/i18n-config";

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: string[] = Array.from(i18n.locales);
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

export function withI18nMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const pathname = request.nextUrl.pathname;
    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
    );

    if (pathnameIsMissingLocale) {
      const locale = getLocale(request);
      const redirectURL = new URL(request.url);
      if (locale) {
        redirectURL.pathname = `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
      }

      redirectURL.search = request.nextUrl.search;

      return NextResponse.redirect(redirectURL.toString());
    }

    return middleware(request, event, response);
  };
}
