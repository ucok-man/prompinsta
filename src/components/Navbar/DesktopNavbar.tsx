import { auth } from "@/auth";

import DesktopSignOut from "./DesktopSignout";
import SigninSignup from "./SigninSignup";

export default async function DesktopNavbar() {
  const session = await auth();

  return (
    <div className="sm:flex hidden">
      {session?.user ? <DesktopSignOut /> : <SigninSignup />}
    </div>
  );
}
