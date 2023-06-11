import { NextResponse } from "next/server";

export default function middleware(req) {
  let token = req.cookies.get("authKey");
  let isAuth;

  if (token === null || token === undefined) {
    isAuth = false;
  } else {
    isAuth = true;
  }
  let url = req.url;

  if (
    isAuth &&
    (url.includes("http://localhost:3000/login") ||
      url.includes("http://localhost:3000/Rgister"))
  ) {
    return NextResponse.redirect("http://localhost:3000/");
  } else if (
    !isAuth &&
    (url === "http://127.0.0.1:3000/" || url === "http://localhost:3000/")
  ) {
    console.log(url);
    return NextResponse.redirect("http://127.0.0.1:3000/login");
  }
}
