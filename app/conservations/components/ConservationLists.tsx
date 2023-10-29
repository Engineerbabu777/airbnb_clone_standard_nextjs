'use client'

import useConservation from '@/app/(site)/hooks/useConservation'
import { FullConversationType } from '@/app/types'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { MdOutlineGroupAdd } from 'react-icons/md'
import ConversationBox from './ConservationBox'
import GroupChatModal from '@/app/(site)/components/modal/GroupChatModal'
import { User } from '@prisma/client'
import { pusherClient } from '@/app/libs/pusher'
import { find } from 'lodash'
import { useSession } from 'next-auth/react'

type Props = {
  initialItems: FullConversationType[],
  users: User[]
}

export default function ConservationLists ({ initialItems, users }: Props) {
  const [items, setItems] = useState(initialItems)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  const { conservationId, isOpen } = useConservation()
  const session = useSession()

  const pusherKey = useMemo(() => {
    return session.data?.user?.email
  }, [session.data?.user?.email])

  useEffect(() => {
    if (!pusherKey) {
      return
    }

    pusherClient.subscribe(pusherKey)

    const updateHandler = (conversation: FullConversationType) => {
      setItems(current =>
        current.map(currentConversation => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages
            }
          }

          return currentConversation
        })
      )
    }

    const newHandler = (conversation: FullConversationType) => {
      setItems(current => {
        if (find(current, { id: conversation.id })) {
          return current
        }

        return [conversation, ...current]
      })
    }

    const removeHandler = (conversation: FullConversationType) => {
      setItems(current => {
        return [...current.filter(convo => convo.id !== conversation.id)]
      })

      if(conservationId === conversation.id){
        router.push('/conservations')
      }
    }

    pusherClient.bind('conversation:update', updateHandler)
    pusherClient.bind('conversation:new', newHandler)
    pusherClient.bind('conversation:remove', removeHandler)
  }, [pusherKey, router,conservationId])

  return (
    <>
      <GroupChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        users={users}
      />
      <aside
        className={clsx(
          `
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200 
      `,
          isOpen ? 'hidden' : 'block w-full left-0'
        )}
      >
        <div className='px-5'>
          <div className='flex justify-between mb-4 pt-4'>
            <div className='text-2xl font-bold text-neutral-800'>Messages</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className='
                rounded-full 
                p-2 
                bg-gray-100 
                text-gray-600 
                cursor-pointer 
                hover:opacity-75 
                transition
              '
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>

          {items.map(item => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conservationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  )
}
