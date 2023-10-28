import { getConservations } from '../(site)/actions/getConservations'
import getUsers from '../(site)/actions/getUsers'
import Sidebar from '../(site)/components/sidebar/Sidebar'
import ConservationLists from './components/ConservationLists'

export default async function ConservationsLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const conservations = await getConservations()
  const users = await getUsers();

  return (
    <>
      <Sidebar>
        <div className='h-full'>
          <ConservationLists initialItems={conservations} users={users} />
          {children}
        </div>
      </Sidebar>
    </>
  )
}
