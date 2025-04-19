"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Profile from "@/components/Profile";
import { GetUserWithPromptResponse, UserWithPromptsType } from "@/types/types";

const UserProfile = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState<UserWithPromptsType>();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const { data }: GetUserWithPromptResponse = await response.json();

      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={`${userName}'s`}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      // data={userPosts}
      posts={userPosts?.prompts}
      user={userPosts}
    />
  );
};

export default UserProfile;
