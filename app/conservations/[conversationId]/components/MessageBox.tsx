'use client'

import { FullMessageType } from '@/app/types'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import { format } from 'date-fns'
import Image from 'next/image'
import { useState } from 'react'
// import ImageModal from './ImageModal'
import Avatar from '@/app/(site)/components/shared/Avatar'

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession()
  const [imageModalOpen, setImageModalOpen] = useState(false)

  // IF THE MESSAGE IS MINE!
  const isOwn = session?.data?.user?.email === data?.sender?.email
  // GETTING THE SEEN LIST FILTERING MY ID!
  const seenList = (data.seen || [])
    .filter(user => user.email !== data?.sender?.email)
    .map(user => user.name)
    .join(', ')

  // !! DYNAMIC CLASSES!
  const container = clsx('flex gap-3 p-4', isOwn && 'justify-end') // CONTAINER STYLES
  const avatar = clsx(isOwn && 'order-2') // AVATAR STYLES!
  const body = clsx('flex flex-col gap-2', isOwn && 'items-end') // BODY STYLES
  const message = clsx(
    'text-sm w-fit overflow-hidden',
    isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
    data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
  ) // MESSAGES STYLES


  // END OF CLASSES!

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className='flex items-center gap-1'>
          <div className='text-sm text-gray-500'>{data.sender.name}</div>
          <div className='text-xs text-gray-400'>
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>
        <div className={message}>
          {/* <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          /> */}
          {data.image ? (
            <Image
              onClick={() => setImageModalOpen(true)}
              alt='Image'
              height='288'
              width='288'
              src={data.image}
              className='
                object-cover
                cursor-pointer
                hover:scale-110
                transition
                translate
              '
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div
            className='
              text-xs
              font-light
              text-gray-500
            '
          >
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  )
}

export default MessageBox
