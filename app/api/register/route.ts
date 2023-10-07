import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismaDB'
import { NextResponse } from 'next/server'

export async function POST (request: Request) {
  try {
    // GET BODY!
    const body = await request.json()
    // EXTRACTING DATA!
    const { name, email, password } = body

    // IF ANY IS EMPTY!
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: true, message: 'Missing Info' },
        { status: 401 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword
      }
    })

    return NextResponse.json(
      { success: true, message: 'User Created!', userDoc: user },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { error: true, message: 'REGISTRATION_ERROR: ' + error?.message },
      { status: 504 }
    )
  }
}
