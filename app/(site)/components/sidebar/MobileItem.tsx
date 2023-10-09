'use client'

import clsx from 'clsx'
import Link from 'next/link'

type Props = {
  route: any
}
export default function MobileItem ({ route }: Props) {
  const handleClick = () => {
    if (route?.onClick) {
      return route?.onClick()
    }
  }

  const Icon = route?.icon

  return (
    <>
      <Link
        href={route?.href}
        className={clsx(
          `
    group flex gap-x-3 text-sm font-semibold leading-6 w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100
    `,
          route?.active && 'bg-gray-100 text-black'
        )}
        onClick={handleClick}
      >
        <Icon className='h-6 w-6 shrink-0' />
      </Link>
    </>
  )
}
