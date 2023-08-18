import { ThemeButton } from './ThemeButton';
import { Title } from './Title';

interface HeaderProps {
   title: string;
   subTitle: string;
}

export function Header({ title, subTitle }: HeaderProps) {
   return (
      <header className="flex justify-between">
         <Title title={title} subTitle={subTitle} />
         <ThemeButton />
      </header>
   );
}
