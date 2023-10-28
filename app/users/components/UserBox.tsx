'use client'

import LoadingModal from '@/app/(site)/components/modal/LoadingModal'
import Avatar from '@/app/(site)/components/shared/Avatar'
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

type Props = {
  user: User
}
export default function UserBox ({ user }: Props) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // MAKE A HANDLE CLICK!
  const handleClick = useCallback(() => {
    setIsLoading(true)
    axios
      .post('/api/conservations', {
        userId: user?.id
      })
      .then((data: any) => {
        router.push('/conservations/' + data?.data.id)
      })
      .catch((error: any) => {})
      .finally(() => {
        setIsLoading(false)
      })
  }, [user, router])
  return (
    <>
       {isLoading && (
        <LoadingModal />
      )}
      <section
        onClick={handleClick}
        className='w-full relative flex items-center space-x-3 bg-white p-3 rounded-lg transition cursor-pointer hover:bg-neutral-100'
      >
        <Avatar currentUser={user} />

        <div className='min-w-0 flex-1'>
          <div className='focus:outline-none'>
            <div className='flex justify-between  items-center mb-1'>
              <p className='text-sm font-medium text-gray-900'>{user?.name}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
