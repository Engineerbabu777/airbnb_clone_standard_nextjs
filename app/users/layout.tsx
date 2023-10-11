import getUsers from '../(site)/actions/getUsers'
import Sidebar from '../(site)/components/sidebar/Sidebar'
import UserList from './components/UserList';

export default async function UsersLayout ({
  children
}: {
  children: React.ReactNode
}) {

  const users = await getUsers();

  console.log('USERS-> ',users);

  return <Sidebar>
    {/* USERS LIST! */}
    <UserList users={users}/>
    {children}
    </Sidebar>
}
