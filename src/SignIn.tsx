import { SignInGithub } from "./auth/SignInGithub";
import { SignInGoogle } from "./auth/SignInGoogle";



export function SignIn() {
  return (
    <>
      <SignInGoogle />
      <SignInGithub />
    </>
  )
}
