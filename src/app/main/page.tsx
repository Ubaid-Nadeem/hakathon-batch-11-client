"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Main() {
  const route = useRouter();

  useEffect(() => {
    const localUser = localStorage.getItem("taskSUer");
    if (localUser) {
      console.log(localUser);
    } else {
      route.push("/login");
    }
  }, []);

  return <div>Welcome User</div>;
}
