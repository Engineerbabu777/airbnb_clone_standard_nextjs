

import prisma from "@/app/libs/prismaDB";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (
  conversationId: string
) => {
  try {
    console.log('1')
    const currentUser = await getCurrentUser();

    console.log("2")

    console.group(currentUser)

    if (!currentUser?.email) {
      return null;
    }

    console.log("3")

    console.log(conversationId)

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true
      }
    });

    console.log('A' , conversation);

    return conversation;
  } catch (error: any) {
    return null;
  }
};

export default getConversationById;