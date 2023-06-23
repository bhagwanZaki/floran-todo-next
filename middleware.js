import { NextResponse } from "next/server";

export default function middleware(req) {
  let token = req.cookies.get("authKey");
  let isAuth;

  if (token === null || token === undefined) {
    isAuth = false;
  } else {
    if(token.value === ""){
      isAuth = false
    } else {
      isAuth = true;
    }
  }
  let url = req.url;
  let webUrl = "https://florantodo.netlify.app/";

  if (
    isAuth &&
    (url.includes(`${webUrl}login`) || url.includes(`${webUrl}register`))
  ) {
    return NextResponse.redirect(`${webUrl}`);
  } else if (!isAuth && (url === webUrl || url.includes(`profile`))) {
    return NextResponse.redirect(`${webUrl}login`);
  }
}
