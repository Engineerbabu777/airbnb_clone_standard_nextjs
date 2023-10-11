import primsa from '../../libs/prismaDB'
import getCurrentUser from './getCurrentUser'

export const getConservations = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser?.id) {
    return []
  }

  try {
    const conservations = await prisma?.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc'
      },
      where: {
        userIds: {
          has: currentUser.id
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true
          }
        }
      }
    });

    return conservations;
  } catch (err: any) {
    console.log(err.message)
    return []
  }
}
