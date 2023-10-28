import getCurrentUser from '@/app/(site)/actions/getCurrentUser'
import prisma from '../../libs/prismaDB'
import { NextResponse } from 'next/server'

export async function POST (req: Request) {
  try {
    const currentUser = await getCurrentUser()
    const body = await req.json()
    const { userId, isGroup, members, name } = body

    console.log(1)

    // IF CURRENT USER IS NOT AVAILABLE!
    if (!currentUser?.email || !currentUser?.id) {
      return NextResponse.json(
        { message: 'You are not authorized!' },
        { status: 401 }
      )
    }

    // IF IS-GROUP VA IS TRUE BUT DATA IS NOT AVAILABLE!
    if (isGroup && (!members || members.length < 2 || !name)) {
      return NextResponse.json({ message: 'Invalid data!' }, { status: 400 })
    }

    // IF DATA IS AVAILABLE FOT GROUP CONSERVATIONS THEN!
    if (isGroup) {
      console.log(2)
      const newConservation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value
              })),
              {
                id: currentUser.id
              }
            ]
          }
        },
        include: {
          users: true
        }
      })
      console.log(3)

      return NextResponse.json(newConservation)
    }

    // FOR SINGLE CHATS!
    const existingConservations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser?.id, userId]
            }
          },
          {
            userIds: {
              equals: [userId, currentUser?.id]
            }
          }
        ]
      }
    })

    const singleConservation = existingConservations[0]
    if (singleConservation) {
      return NextResponse.json(singleConservation, { status: 200 })
    }

    // ELSE CREATE NEW CONSERVATION!
    const newConservation = await prisma.conversation.create({
      data: {
        users: {
          connect: [{ id: currentUser?.id }, { id: userId }]
        }
      },
      include: {
        users: true
      }
    })

    return NextResponse.json(newConservation, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ message: error?.message }, { status: 500 })
  }
}
