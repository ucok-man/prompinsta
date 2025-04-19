import { auth, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export default async function DesktopSignOut() {
  const session = await auth();
  return (
    <div className="flex gap-3 md:gap-5">
      <Link href="/create-prompt" className="black_btn">
        Create Post
      </Link>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit" className="outline_btn">
          Sign Out
        </button>
      </form>

      <Link href="/profile">
        <Image
          src={session?.user.image!}
          width={37}
          height={37}
          className="rounded-full"
          alt="profile"
        />
      </Link>
    </div>
  );
}
