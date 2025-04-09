import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRouter } from "./router/AppRouter";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "./store/atoms";
import { useEffect } from "react";

const queryClient = new QueryClient();
function App() {
   // sync auth with localStorage
   const currentUser = useAtomValue(currentUserAtom);
   useEffect(() => {
      localStorage.setItem(
         "currentUser",
         currentUser ? JSON.stringify(currentUser) : ""
      );

      console.log(currentUser);
   }, [currentUser]);

   console.log(currentUser);

   return (
      <>
         <QueryClientProvider client={queryClient}>
            <AppRouter />
         </QueryClientProvider>
      </>
   );
}

export { App };
