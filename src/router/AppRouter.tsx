import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "~/components/Layout";
import { routes } from "~/global/config/routes.config";
import { HomePage } from "~/pages/HomePage/HomePage";
import { LoginPage } from "~/pages/LoginPage/LoginPage";
import { NotFoundPage } from "~/pages/NotFoundPage";
import { AdminRoutes } from "./AdminRoutes";
import { UploadPage } from "~/pages/AdminPages/UploadPage/UploadPage";
import { BooksPage } from "~/pages/AdminPages/BooksPage/BooksPage";
import { DashboardPage } from "~/pages/AdminPages/DashboardPage/DashboardPage"
import { UsersPage } from "~/pages/AdminPages/UsersPage/UsersPage";

function AppRouter() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path={routes.home} element={<Layout />}>
               <Route index path={routes.home} element={<HomePage />} />
               <Route path={routes.login} element={<LoginPage />} />
               {/* <Route path={} element={}/> */}

               <Route path={routes.admin} element={<AdminRoutes />}>
                  <Route index element={<h1>Admin panel</h1>} />
                  <Route path={routes.upload} element={<UploadPage />} />
                  <Route path={routes.books} element={<BooksPage />} />
                  <Route path={routes.dashboard} element={<DashboardPage />} />
                  <Route path={routes.users} element={<UsersPage />} />
               </Route>

               <Route path="*" element={<NotFoundPage />} />
            </Route>
         </Routes>
      </BrowserRouter>
   );
}

export { AppRouter };
