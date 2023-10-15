import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const verifyJWT = async (token) => {
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload;
};

export default async function middleware(req, res) {
  const token = req.cookies.get(process.env.COOKIE_NAME);

  if (!token) {
    req.nextUrl.pathname = "/nazaara-admin";
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    await verifyJWT(token);
    return NextResponse.next();
  } catch (e) {
    console.error(e);
    req.nextUrl.pathname = "/nazaara-admin";
    return NextResponse.redirect(req.nextUrl);
  }
}
