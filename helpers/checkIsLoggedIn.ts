"use client";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

export const checkIsLoggedIn = () => {
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
        // navigate to "/nazaara-admin" if user is not logged in using any server side rendering method
        router.push("/nazaara-admin");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
