import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";
import { toast } from "react-toastify";

export function middleware(request: NextRequest) {

  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);
  const token = cookies.token;
  const roleId = cookies.role_id;

  const pathname = request.nextUrl.pathname

  //CMS
  if (pathname.startsWith("/cms")) {
    if (pathname === "/cms/login") {
      return NextResponse.next(); // cho phép vào trang login
    }
    //Không có token hoặc role đẩy về trang đăng nhập 
    if (!token || !roleId) {
      return NextResponse.redirect(new URL("/cms/login", request.url));
    }
    //Chặn user truy cập vào CMS
    if (roleId === "2") {
      return NextResponse.redirect(new URL("/forbidden", request.url));
    }

    return NextResponse.next();
  }

  //Cart
  if (pathname === "/cart") {
    //Không có token đẩy về trang chủ
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    //Chặn Admin truy cập vào trang cart của user
    if (roleId === "1")
      return NextResponse.redirect(new URL("/cms/login", request.url));
  }

  return NextResponse.next();
}


// Cấu hình matcher để middleware áp dụng cho tất cả các route dưới /cms
export const config = {
  matcher: [
    "/cms/dashboard",
    "/cms/products",
    "/cms/inventories",
    "/cms/categories",
    "/cms/orders",
    "/cms/login",
    "/cart",
    "/forbidden"
  ],
};

