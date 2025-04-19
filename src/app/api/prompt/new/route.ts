import {
  CreatePromptDTO,
  CreatePromptResponse,
  ResponseTemplateStatus,
} from "@/types/types";
import prisma from "@/utils/database";

export const POST = async (req: Request) => {
  const reqdata: CreatePromptDTO = await req.json();

  try {
    const prompt = await prisma.prompt.create({
      data: {
        prompt: reqdata.prompt,
        tag: reqdata.tag,
        userId: reqdata.userId,
      },
    });
    return Response.json(
      {
        data: prompt,
        status: ResponseTemplateStatus.SUCCESS,
      } as CreatePromptResponse,
      {
        status: 201,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);

      return Response.json(
        {
          errMsg: error.message,
          status: ResponseTemplateStatus.SUCCESS,
        } as CreatePromptResponse,
        {
          status: 500,
        }
      );
    }
  }
};
