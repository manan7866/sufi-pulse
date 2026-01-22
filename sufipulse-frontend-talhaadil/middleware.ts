import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;
  const userRole = request.cookies.get("user_role")?.value;
  const permissionsCookie = request.cookies.get("permissions")?.value;
  const isAuth = Boolean(accessToken);

  let permissions: Record<string, string[]> = {};
  try {
    if (permissionsCookie) {
      permissions = JSON.parse(permissionsCookie);
    }
  } catch (error) {
    console.error("Failed to parse permissions cookie:", error);
  }

  const isAdminRoute = pathname.startsWith("/admin");
  const isVocalistRoute =
    pathname.startsWith("/vocalist") &&
    pathname !== "/vocalist-how-it-works" &&
    pathname !== "/vocalists";
  const isWriterRoute =
    pathname.startsWith("/writer") && pathname !== "/writer-faqs";

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  const permissionMap: Record<string, string> = {
    "/admin/vocalists": "vocalist",
    "/admin/writers": "writer",
    "/admin/kalams": "kalams",
    "/admin/studio-requests": "requests",
    "/admin/remote-requests": "requests",
    "/admin/partnership": "partnership_proposal",
    "/admin/notifications": "notification",
    "/admin/other-admins": "sub_admins",
    "/admin/blog": "blog",
  };

  if (isAdminRoute) {
    if (!isAuth) {
      const loginUrl = new URL("/aLogin", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (userRole !== "admin" && userRole !== "sub-admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (userRole === "sub-admin") {
      const requiredPermission = Object.entries(permissionMap).find(([route]) =>
        pathname.startsWith(route)
      )?.[1];

      if (
        requiredPermission &&
        (!permissions[requiredPermission] ||
          !permissions[requiredPermission].includes("view"))
      ) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    }
  }

  // NEW: check vocalist/writer routes
  if ((isVocalistRoute || isWriterRoute) && !isAuth) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/vocalist/:path*", "/writer/:path*"],
};
