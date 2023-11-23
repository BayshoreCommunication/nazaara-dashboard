"use client";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

const checkIsLoggedIn = () => {
  const router = useRouter();

  fetch(`${process.env.API_URL}/api/v1/user/isLoggedIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
      console.log("is logged in error", err);
    });
};

export { checkIsLoggedIn };
