import { PromptType, UserType } from "@/types/types";
import PromptCard from "./PromptCard";

type Props = {
  name: string;
  desc: string;
  posts: PromptType[] | undefined;
  user: UserType | undefined;
  handleEdit?: (e: any) => void;
  handleDelete?: (e: any) => void;
};

function Profile({ name, desc, posts, user, handleEdit, handleDelete }: Props) {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {posts && posts?.length > 0 ? (
        <div className="mt-10 prompt_layout">
          {posts?.map((post) => (
            <PromptCard
              key={post.id}
              post={post}
              user={user}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 size-full">
          <p className="text-center text-lg w-full text-neutral-500">
            😇 No post is created!
          </p>
        </div>
      )}
    </section>
  );
}

export default Profile;
