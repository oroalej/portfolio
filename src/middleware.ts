import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

const adminPath = "/admin";

async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;
  const supabase = createMiddlewareClient({ req, res });

  if (pathname.startsWith(adminPath) && !pathname.startsWith("/admin/login")) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", req.nextUrl.pathname);

      return NextResponse.redirect(loginUrl);
    }
  }

  return res;
}

export default middleware;
