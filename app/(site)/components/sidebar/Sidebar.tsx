import getCurrentUser from '../../actions/getCurrentUser'
import DesktopSidebar from './DesktopSidebar'
import MobileFooter from './MobileFooter'

type Props = {
  children: React.ReactNode
}
export default async function Sidebar ({ children }: Props) {
  const currentUser = await getCurrentUser()

  return (
    <>
      <div className='h-full'>
        {/* DESKTOP SIDE BAR */}
        <DesktopSidebar currentUser={currentUser!} />
        <MobileFooter currentUser={currentUser}/>
        <main className='lg:pl-20 h-full'>{children}</main>
      </div>
    </>
  )
}
