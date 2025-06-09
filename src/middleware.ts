import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './i18nConfig'; 
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = i18nRouter(request, i18nConfig);
  return response;
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
