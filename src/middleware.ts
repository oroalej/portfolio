import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs'
import {NextRequest, NextResponse} from 'next/server'

const adminPath = "/admin";

async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({req, res})

    if (req.nextUrl.pathname.startsWith(adminPath)) {
        const {data: {session}} = await supabase.auth.getSession();

        if(!session) {
            const loginUrl = new URL('/login', req.url)
            loginUrl.searchParams.set('from', req.nextUrl.pathname)

            return NextResponse.redirect(loginUrl);
        }
    }

    return res
}

export default middleware;
