"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MobileSignOut() {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const { data, status } = useSession();

  useEffect(() => {}, [status]);

  return (
    <div className="flex">
      <Image
        src={data?.user.image!}
        width={37}
        height={37}
        className="rounded-full"
        alt="profile"
        onClick={() => {
          setToggleDropdown((prev) => !prev);
        }}
      />
      {toggleDropdown && (
        <div className="dropdown">
          <Link
            href="/profile"
            className="dropdown_link"
            onClick={() => setToggleDropdown(false)}
          >
            My Profile
          </Link>
          <Link
            href="/create-prompt"
            className="dropdown_link"
            onClick={() => setToggleDropdown(false)}
          >
            Create Prompt
          </Link>
          <button
            type="button"
            className="mt-5 w-full black_btn"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
