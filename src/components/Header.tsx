import { ThemeButton } from './ThemeButton';
import { Title } from './Title';
import { UserAvatar } from './UserAvatar';

interface HeaderProps {
   title: string;
   subTitle: string;
}

export function Header({ title, subTitle }: HeaderProps) {
   return (
      <header className="flex justify-between">
         <Title title={title} subTitle={subTitle} />

         <div className="flex items-center gap-1">
            <ThemeButton />
            <UserAvatar />
         </div>
      </header>
   );
}
