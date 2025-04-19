"use client";

import { GetAllPromptResponse, PromptWithUserType } from "@/types/types";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

type PromptCardListProp = {
  handleTagClick: (tagName: string) => void;
  data: PromptWithUserType[] | undefined;
};

const PromptCardList = ({ data, handleTagClick }: PromptCardListProp) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => (
        <PromptCard
          key={post.id}
          post={post}
          user={post.user}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export default function Feed() {
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<
    string | number | ReturnType<typeof setTimeout> | undefined
  >();
  const [searchedResults, setSearchedResults] =
    useState<PromptWithUserType[]>();
  const [posts, setPosts] = useState<PromptWithUserType[]>();

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt", { cache: "no-store" });
    const { data }: GetAllPromptResponse = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts?.filter(
      (item) =>
        regex.test(item.user.name!) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <>
      <section className="feed">
        <form className="relative w-full flex-center">
          <input
            type="text"
            placeholder="Search for a tag or a username"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
          />
        </form>
      </section>
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </>
  );
}
