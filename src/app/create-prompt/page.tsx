"use client";

import Form from "@/components/Form";
import { CreatePromptDTO, CreatePromptResponse } from "@/types/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CreatePrompt = () => {
  const router = useRouter();
  const { data, status } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<CreatePromptDTO>({
    prompt: "",
    userId: "",
    tag: "",
  });
  useEffect(() => {}, [status]);

  const createPrompt = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post?.prompt,
          userId: data?.user.id,
          tag: post?.tag,
        }),
      });
      const body: CreatePromptResponse = await response.json();
      if (!response.ok) {
        throw new Error(`${body.status} | ${body.errMsg}`);
      }
      router.push("/");
    } catch (e) {
      console.log("error create prompt: ", e);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
