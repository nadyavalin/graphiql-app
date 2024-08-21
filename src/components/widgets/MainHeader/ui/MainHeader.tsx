"use client";

import { SimpleButton } from "@shared/ui-kit/buttons";
import { useRouter } from "next/navigation";
import React from "react";

const MainHeader = () => {
  const router = useRouter();

  return (
    <header className="flex min-h-20 w-full justify-between gap-5 px-4 py-2 md:px-10">
      <SimpleButton buttonDetails={{ name: "Login" }} onClick={() => router.push("login")} />
      <SimpleButton
        buttonDetails={{ name: "Registration" }}
        onClick={() => router.push("registration")}
      />
      <SimpleButton buttonDetails={{ name: "Welcome" }} onClick={() => router.push("/")} />
    </header>
  );
};

export default MainHeader;
