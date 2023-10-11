'use client'

import UserBox from "./UserBox"

type Props = {
  users: any
}

export default function UserList ({ users }: Props) {
  return (
    <>
      <aside className='fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0'>
        <div className='px-5'>
          <div className='flex-col flex'>
            <div className='text-2xl font-bold text-neutral-800 py-4 '>
              People
            </div>
          </div>

          {users?.length > 0 && users.map((user:any,ind:number) => (
           <UserBox user={user} key={ind}/>
          ))}
        </div>
      </aside>
    </>
  )
}
