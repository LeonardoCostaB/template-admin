import { Item } from './Item';
import { Home, Sliders, Bell, LogOut } from 'lucide-react';
import { Logo } from '../Logo';

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
                  className="text-red-600 hover:bg-red-400 hover:text-white dark:text-red-400 dark:hover:text-white"
                  text="Logout"
                  icon={<LogOut size={20} />}
                  onClick={() => false}
               />
            </ul>
         </nav>
      </aside>
   );
}
