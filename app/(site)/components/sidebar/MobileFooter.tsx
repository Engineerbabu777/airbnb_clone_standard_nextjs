'use client'

import useConservation from '../../hooks/useConservation'
import useRoutes from '../../hooks/useRoutes'
import MobileItem from './MobileItem'

type Props = {}
export default function MobileFooter ({}: Props) {
  const routes = useRoutes()
  const { isOpen } = useConservation()

  if (isOpen) {
    return null
  }
  return (
    <>
      <div className='fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden'>
        {routes.map(( route, ind )=> (
            <MobileItem route={route} key={ind}/>
        ))}
      </div>
    </>
  )
}
