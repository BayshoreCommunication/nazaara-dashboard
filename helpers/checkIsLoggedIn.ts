"use client";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

export const CheckIsLoggedIn = () => {
  const router = useRouter();

  fetch(`${process.env.API_URL}/api/v1/user/isLoggedIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Nazaara@Token ${process.env.API_SECURE_KEY}`,
    },
    body: JSON.stringify({
      token: getCookie("token"),
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status != "success") {
        router.push("/nazaara-admin");
      }
    })
    .catch((err) => {
      console.error("is logged in error", err);
    });
};
