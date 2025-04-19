import { Prompt, User } from "@prisma/client";

export enum ResponseTemplateStatus {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
}

type ResponseTemplate<DATA> = {
  errMsg?: string;
  status: ResponseTemplateStatus;
  data?: DATA;
};

export interface PromptType extends Prompt {}
export interface UserType extends User {}
export interface PromptWithUserType extends PromptType {
  user: UserType;
}
export interface UserWithPromptsType extends UserType {
  prompts: PromptType[];
}

export interface CreatePromptDTO
  extends Pick<PromptType, "prompt" | "tag" | "userId"> {}

export interface CreatePromptResponse extends ResponseTemplate<PromptType> {}

export interface GetPromptResponse
  extends ResponseTemplate<PromptWithUserType> {}

export interface GetAllPromptResponse
  extends ResponseTemplate<PromptWithUserType[]> {}

export interface UpdatePromptDTO extends Pick<PromptType, "prompt" | "tag"> {}
export interface UpdatePromptResponse extends ResponseTemplate<PromptType> {}

export interface DeletePromptResponse extends ResponseTemplate<string> {}

export interface GetUserWithPromptResponse
  extends ResponseTemplate<UserWithPromptsType> {}
