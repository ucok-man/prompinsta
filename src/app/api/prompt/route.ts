import { GetAllPromptResponse, ResponseTemplateStatus } from "@/types/types";
import prisma from "@/utils/database";

export const GET = async (req: Request) => {
  try {
    const prompts = await prisma.prompt.findMany({
      include: {
        user: true,
      },
    });
    return Response.json(
      {
        data: prompts,
        status: ResponseTemplateStatus.SUCCESS,
      } as GetAllPromptResponse,
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
          status: ResponseTemplateStatus.FAILURE,
        } as GetAllPromptResponse,
        {
          status: 500,
        }
      );
    }
  }
};
