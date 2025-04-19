import {
  DeletePromptResponse,
  GetPromptResponse,
  ResponseTemplateStatus,
  UpdatePromptDTO,
  UpdatePromptResponse,
} from "@/types/types";
import prisma from "@/utils/database";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const prompt = await prisma.prompt.findUnique({
      where: {
        id: params.id,
      },
      include: {
        user: true,
      },
    });

    return Response.json(
      {
        status: ResponseTemplateStatus.SUCCESS,
        data: prompt,
      } as GetPromptResponse,
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
        } as GetPromptResponse,
        {
          status: 500,
        }
      );
    }
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { prompt, tag }: UpdatePromptDTO = await req.json();
  try {
    const updatedPrompt = await prisma.prompt.update({
      where: {
        id: params.id,
      },
      data: {
        prompt: prompt,
        tag: tag,
      },
    });

    return Response.json(
      {
        data: updatedPrompt,
        status: ResponseTemplateStatus.SUCCESS,
      } as UpdatePromptResponse,
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        {
          errMsg: error.message,
          status: ResponseTemplateStatus.FAILURE,
        } as UpdatePromptResponse,
        {
          status: 500,
        }
      );
    }
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await prisma.prompt.delete({
      where: {
        id: params.id,
      },
    });
    return Response.json(
      {
        data: `deleted prompt id ${params.id}`,
        status: ResponseTemplateStatus.SUCCESS,
      } as DeletePromptResponse,
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        {
          errMsg: error.message,
          status: ResponseTemplateStatus.FAILURE,
        } as DeletePromptResponse,
        {
          status: 500,
        }
      );
    }
  }
};
