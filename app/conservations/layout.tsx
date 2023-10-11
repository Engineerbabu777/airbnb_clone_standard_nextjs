import { getConservations } from '../(site)/actions/getConservations'
import Sidebar from '../(site)/components/sidebar/Sidebar'
import ConservationLists from './components/ConservationLists'

export default async function ConservationsLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const conservations = await getConservations()

  return (
    <>
      <Sidebar>
        <div className='h-full'>
          <ConservationLists initialItems={conservations} />
          {children}
        </div>
      </Sidebar>
    </>
  )
}
