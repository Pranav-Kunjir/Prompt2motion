"use client";
import { Landing } from "./pages/Landing";
import { Authenticated, Unauthenticated } from "convex/react";
import { AnimationWorkSpace } from "./pages/AnimationWorkSpace";

export default function App() {
  return (
    <>
      <main>
        <Authenticated>
          <AnimationWorkSpace />
        </Authenticated>
        <Unauthenticated>
          <Landing />
        </Unauthenticated>
      </main>
    </>
  );
}
