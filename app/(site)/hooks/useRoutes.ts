import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

import { HiChat } from 'react-icons/hi'
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2'

import { signOut } from 'next-auth/react'

import useConservation from './useConservation'

export default function useRoutes () {
  const pathname = usePathname()
  const { conservationId } = useConservation()

  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conservations',
        icon: HiChat,
        active: pathname === '/conservations' || !!conservationId
      },
      {
        label: 'User',
        href: '/users',
        icon: HiUsers,
        active: pathname === '/users'
      },
      {
        label: 'Logout',
        href: '#',
        onClick: () => signOut(),
        icon: HiArrowLeftOnRectangle
      }
    ],
    [conservationId, pathname]
  )

  return routes
}
