import prisma from '../../libs/prismaDB'

import getSession from './getSession'

export default async function getUsers () {
  const session = await getSession();


  // IF NO SESSION AVAILABLE
  if(!session?.user?.email){
    return [];
  }

  // ELSE !

  try {
    const users = await prisma.user.findMany({
        orderBy:{
            createdAt:'desc',
        },
        where:{
            NOT:{
                email:session?.user?.email,
            }
        }
    });

    return users;
  } catch (error:any) {
    return [];
  }
}
