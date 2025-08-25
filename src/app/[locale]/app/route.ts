import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.redirect('https://api.moomkin.uz/app', 302);
}


