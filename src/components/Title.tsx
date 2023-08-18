interface TitleProps {
   title: string;
   subTitle: string;
}

export function Title({ title, subTitle }: TitleProps) {
   return (
      <div className="">
         <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100">
            {title}
         </h1>
         <h2 className="text-sm font-light text-gray-600 dark:text-gray-300">
            {subTitle}
         </h2>
      </div>
   );
}
