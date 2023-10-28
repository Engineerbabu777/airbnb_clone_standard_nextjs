import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Conversation, Message, User } from '@prisma/client'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import { FullConversationType } from '@/app/types/index'
import useOtherUser from '@/app/(site)/hooks/useOtherUsers'
import Avatar from '@/app/(site)/components/shared/Avatar'
import AvatarGroup from '@/app/(site)/components/shared/GroupAvatar'

type Props = {
  data: FullConversationType,
  selected: boolean
}

export default function ConversationBox ({ data, selected }: Props) {
  const otherUser = useOtherUser(data)
  const session = useSession()
  const router = useRouter()

  // WILL NAVIGATE TO SPECIFIC CHAT!
  const handlerClick = useCallback(() => {
    router.push(`/conservations/${data.id}`)
  }, [data?.id, router])

  //   FUNCTION TO GET LAST MESSAGE!
  const lastMessage = useMemo(() => {
    // USING USE-MEMO TO MEMORIZE THE VALUE RETURNING BY THE FUNCTION!
    // INITIAL ALL MESSAGES STATE!
    const messages = data.messages || []

    // RETURN THE LAST MESSAGE FROM MESSAGES ARRAY!
    return messages[messages.length - 1]
  }, [data.messages])

  // USER EMAIL CURRENT USER!
  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  )

  // SEEN MESSAGES!
  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false
    }

    const seenArray = lastMessage.seen || []

    if (!userEmail) {
      return false
    }
    return seenArray.filter(user => user.email === userEmail).length !== 0
  }, [userEmail, lastMessage])

  // LAST MESSAGE!
  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an image'
    }

    if (lastMessage?.body) {
      return lastMessage?.body
    }

    return 'Started a conversation'
  }, [lastMessage])

  return (<>
  <div
      onClick={handlerClick}
      className={clsx(`
        w-full 
        relative 
        flex 
        items-center 
        space-x-3 
        p-3 
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
        `,
        selected ? 'bg-neutral-100' : 'bg-white'
      )}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p 
                className="
                  text-xs 
                  text-gray-400 
                  font-light
                "
              >
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p 
            className={clsx(`
              truncate 
              text-sm
              `,
              hasSeen ? 'text-gray-500' : 'text-black font-medium'
            )}>
              {lastMessageText}
            </p>
        </div>
      </div>
    </div>
  </>)
}
