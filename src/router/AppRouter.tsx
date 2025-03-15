import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "~/components/Layout";
import { routes } from "~/global/config/routes.config";
import { LoginPage } from "~/pages/LoginPage/LoginPage";

function AppRouter() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path={routes.home} element={<Layout />}>
               <Route index path={routes.home} element={<>Home</>}/>
               <Route path={routes.login} element={<LoginPage/>}/>
               {/* <Route path={} element={}/> */}
            
            
            </Route>
         </Routes>
      </BrowserRouter>
   );
}

export { AppRouter };
