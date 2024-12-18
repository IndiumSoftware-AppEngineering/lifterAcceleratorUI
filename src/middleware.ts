import { sessionStatus } from "./utils/session";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];

export default function middleware (req: NextRequest) {
    console.log(req);
    if(!sessionStatus && protectedRoutes.includes(req.nextUrl.pathname)) {
        const absoluteURL = new URL("/", req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
    }
}