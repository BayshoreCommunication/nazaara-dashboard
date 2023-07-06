import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const verifyJWT = async (jwt) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload;
};

export default async function middleware(req, res) {

  const jwt = req.cookies.get(process.env.COOKIE_NAME);

  if (!jwt) {
    req.nextUrl.pathname = "/nazara-admin";
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    await verifyJWT(jwt.value);
    return NextResponse.next();
  } catch (e) {
    console.error(e);
    req.nextUrl.pathname = "/nazara-admin";
    return NextResponse.redirect(req.nextUrl);
  }
}