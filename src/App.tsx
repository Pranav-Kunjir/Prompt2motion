"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import { SignIn } from "./SignIn";
// import { SignOut } from "./auth/SignOut";
import { AnimationWorkSpace } from "./pages/AnimationWorkSpace";

export default function App() {
  return (
    <>
      <main>
        <Authenticated>
          <AnimationWorkSpace />
        </Authenticated>
        <Unauthenticated>
          <SignIn />
        </Unauthenticated>
      </main>
    </>
  );
}
