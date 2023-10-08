import DesktopSidebar from './DesktopSidebar'

type Props = {
  children: React.ReactNode
}
export default function Sidebar ({ children }: Props) {
  return (
    <>
      <div className='h-full'>
        {/* DESKTOP SIDE BAR */}
        <DesktopSidebar />
        <main className='lg:pl-20 h-full'>{children}</main>
      </div>
    </>
  )
}
