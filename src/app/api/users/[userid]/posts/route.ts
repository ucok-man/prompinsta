import {
  GetUserWithPromptResponse,
  ResponseTemplateStatus,
} from "@/types/types";
import prisma from "@/utils/database";

export const GET = async (
  req: Request,
  { params }: { params: { userid: string } }
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: params.userid,
      },
      include: {
        prompts: true,
      },
    });
    return Response.json(
      {
        status: ResponseTemplateStatus.SUCCESS,
        data: user,
      } as GetUserWithPromptResponse,
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);

      return Response.json(
        {
          errMsg: error.message,
          status: ResponseTemplateStatus.FAILURE,
        } as GetUserWithPromptResponse,
        {
          status: 500,
        }
      );
    }
  }
};
