'use client'

import clsx from 'clsx'
import Link from 'next/link'

type Props = {
  route: any
}
export default function DesktopItem ({ route }: Props) {
  const handleClick = () => {
    if (route?.onClick) {
      return route?.onClick()
    }
  }

  const Icon = route.icon

  return (
    <>
      <li onClick={handleClick} className=''>
        <Link
          href={route?.href}
          className={clsx(
            `
        group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100
        `,
            route?.active && 'bg-gray-100 text-black'
          )}
        >
          <Icon className={'w-6 h-6 shrink-0'} />
          <span className='sr-only'>{route?.label}</span>
        </Link>
      </li>
    </>
  )
}
