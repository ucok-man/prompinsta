import { signIn } from "@/auth";

export default function SigninSignup() {
  return (
    <div className="flex gap-x-5">
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/" });
        }}
      >
        <button type="submit" className="black_btn">
          Sign In
        </button>
      </form>
    </div>
  );
}
