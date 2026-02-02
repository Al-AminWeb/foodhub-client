import { NextRequest, NextResponse } from "next/server";

// Simple JWT decode function (no external lib needed)
function decodeToken(token: string) {
    try {
        const base64Payload = token.split('.')[1];
        const payload = Buffer.from(base64Payload, 'base64').toString('utf-8');
        return JSON.parse(payload);
    } catch {
        return null;
    }
}

export function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Read token from cookie
    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const decoded = decodeToken(token);

    if (!decoded || !decoded.role) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const role = decoded.role;

    // Admin trying to access customer/provider routes
    if (role === "ADMIN" && (pathname.startsWith("/dashboard") || pathname.startsWith("/provider"))) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    // Customer trying to access admin/provider routes
    if (role === "CUSTOMER" && (pathname.startsWith("/admin") || pathname.startsWith("/provider"))) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Provider trying to access admin/customer routes
    if (role === "PROVIDER" && (pathname.startsWith("/admin") || pathname === "/dashboard" || pathname.startsWith("/dashboard/"))) {
        return NextResponse.redirect(new URL("/provider/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin/:path*",
        "/provider/:path*",
    ],
};