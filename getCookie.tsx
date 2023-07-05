import { cookies } from "next/headers";

export default function GetCookie() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return token;
}
