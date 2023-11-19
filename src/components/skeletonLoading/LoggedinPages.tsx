import { Skeleton } from '@mui/material';

export function LoggedinPages() {
   return (
      <div className="flex h-fit items-center justify-between">
         <Skeleton
            variant="text"
            sx={{ fontSize: '32px' }}
            width={250}
            animation="wave"
            className="!bg-gray-700"
         />

         <div className="flex items-center gap-2">
            <Skeleton
               variant="rounded"
               animation="wave"
               width={80}
               height={32}
               className="!bg-gray-700"
            />

            <Skeleton
               variant="circular"
               animation="wave"
               width={32}
               height={32}
               className="!bg-gray-700"
            />
         </div>
      </div>
   );
}
