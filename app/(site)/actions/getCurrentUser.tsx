import getSession from './getSession'

import prisma from '../../libs/prismaDB';

export default async function getCurrentUser () {
  try {
    const session = await getSession()

    // CHECK IF SESSION USER EXISTS!
    if (!session?.user?.email) {
      return null
    }

    // CHECK IF USER EXISTS IN DB
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    });

    if(!currentUser){
        return null;
    }

    return currentUser;


  } catch (error) {
    return null
  }
}
