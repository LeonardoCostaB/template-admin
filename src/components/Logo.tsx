export function Logo() {
   return (
      <div className="flex h-20 w-20 flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-800">
         <div className="flex h-10 w-10 flex-col items-center justify-center rounded-full bg-white">
            <div className="mb-0.5 h-3 w-3 rounded-full bg-red-600" />

            <div className="mt-0.5 flex">
               <div className="mb-0.5 mr-0.5 h-3 w-3 rounded-full bg-yellow-500" />
               <div className="mb-0.5 ml-0.5 h-3 w-3 rounded-full bg-green-600" />
            </div>
         </div>
      </div>
   );
}
