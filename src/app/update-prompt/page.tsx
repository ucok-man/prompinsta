"use client";

import Form from "@/components/Form";
import { CreatePromptDTO, GetPromptResponse } from "@/types/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<CreatePromptDTO>({
    prompt: "",
    tag: "",
    userId: "",
  });
  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const { data }: GetPromptResponse = await response.json();

      if (data) {
        setPost({
          prompt: data?.prompt,
          tag: data?.tag,
          userId: data.userId,
        });
      }
    };
    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert("Prompt ID not found");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post?.prompt,
          tag: post?.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
