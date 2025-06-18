import { useAuthActions } from "@convex-dev/auth/react";

export function SignInGoogle() {
  const { signIn } = useAuthActions();
  return (
    <button onClick={() => void signIn("google")}>Google</button>
  )
}
