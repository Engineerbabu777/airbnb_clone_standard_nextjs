'use client'

import clsx from 'clsx'
import useConservation from '../(site)/hooks/useConservation'
import EmptyState from '../(site)/components/shared/EmptyState'

export default function Home () {
  const { isOpen } = useConservation()


  return (<>
  <div className={clsx(`
     lg:pl-80 h-full lg:block 
  `, isOpen ? "block":"hidden")}>
<EmptyState />
  </div>
  </>)
}
