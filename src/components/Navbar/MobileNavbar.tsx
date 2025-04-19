import { auth } from "@/auth";
import MobileSignOut from "./MobileSignout";
import SigninSignup from "./SigninSignup";

export default async function MobileNavbar() {
  const session = await auth();

  return (
    <div className="sm:hidden flex relative">
      {session?.user ? <MobileSignOut /> : <SigninSignup />}
    </div>
  );
}
