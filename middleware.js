import { NextResponse } from "next/server";

export default function middleware(req) {
  let token = req.cookies.get("authKey");
  let isAuth;

  console.log(token);

  if (token === null || token === undefined || token === "") {
    isAuth = false;
  } else {
    isAuth = true;
  }
  let url = req.url;
  let webUrl = "http://127.0.0.1:3000/";
  console.log(`${webUrl}profile`)
  console.log(url)
  console.log(url.includes(`profile`));
  console.log(!isAuth && (url === webUrl || url.includes(`${webUrl}profile`)));

  if (
    isAuth &&
    (url.includes(`${webUrl}login`) || url.includes(`${webUrl}register`))
  ) {
    return NextResponse.redirect(`${webUrl}`);
  } else if (!isAuth && (url === webUrl || url.includes(`profile`))) {
    return NextResponse.redirect(`${webUrl}login`);
  }
}
