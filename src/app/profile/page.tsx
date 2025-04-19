"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@/components/Profile";
import { GetUserWithPromptResponse, PromptType, UserType } from "@/types/types";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const { data: session } = useSession();
  const [data, setData] = useState<{
    posts: PromptType[];
    user: UserType;
  }>();
  const router = useRouter();

  useEffect(() => {
    const fetchUserWithPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`, {
        cache: "no-store",
      });
      const { data }: GetUserWithPromptResponse = await response.json();
      setData({
        posts: data?.prompts!,
        user: {
          ...data!,
        },
      });
    };
    if (session?.user?.id) fetchUserWithPosts();
  }, [session?.user?.id]);

  const handleEdit = (post: PromptType) => {
    router.push(`/update-prompt?id=${post.id}`);
  };

  const handleDelete = async (post: PromptType) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post.id?.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = data?.posts.filter((p) => p.id !== post.id);
        const newData: {
          posts: PromptType[];
          user: UserType;
        } = {
          posts: filteredPosts!,
          user: data?.user!,
        };
        setData(newData);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      posts={data?.posts}
      user={data?.user}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
