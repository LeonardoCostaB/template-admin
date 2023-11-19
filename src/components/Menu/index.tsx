import { Item } from './Item';
import { Home, Sliders, Bell, UserCircle2 } from 'lucide-react';
import { Logo } from '../Logo';
import { LogoutButton } from './LogoutButton';

export function Menu() {
   return (
      <aside className="flex flex-col dark:bg-gray-900">
         <Logo />

         <nav className="flex flex-1 flex-col justify-between">
            <ul className="">
               <Item
                  url="/"
                  text="Home"
                  icon={
                     <Home
                        size={20}
                        className="text-black dark:text-gray-200"
                     />
                  }
               />
               <Item
                  url="/settings"
                  text="Settings"
                  icon={
                     <Sliders
                        size={20}
                        className="text-black dark:text-gray-200"
                     />
                  }
               />
               <Item
                  url="/notifications"
                  text="Notifications"
                  icon={
                     <Bell
                        size={20}
                        className="text-black dark:text-gray-200"
                     />
                  }
               />
            </ul>

            <ul>
               <Item
                  url="/profile"
                  className=""
                  text="User"
                  icon={
                     <UserCircle2
                        size={20}
                        className="text-black dark:text-gray-200"
                     />
                  }
               />

               <LogoutButton />
            </ul>
         </nav>
      </aside>
   );
}
