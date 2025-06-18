import { useAuthActions } from "@convex-dev/auth/react";

export function SignInGithub() {
  const { signIn } = useAuthActions();
  return (
    <button onClick={() => void signIn("github")}>Github</button >
  )
}
