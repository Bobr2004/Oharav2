import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "~/components/Layout";
import { routes } from "~/global/config/routes.config";
import { HomePage } from "~/pages/HomePage/HomePage";
import { LoginPage } from "~/pages/LoginPage/LoginPage";
import { NotFoundPage } from "~/pages/NotFoundPage";
import { AdminRoutes } from "./AdminRoutes";
import { UploadPage } from "~/pages/AdminPages/UploadPage/UploadPage";
import { BooksPage } from "~/pages/AdminPages/BooksPage/BooksPage";
import { DashboardPage } from "~/pages/AdminPages/DashboardPage/DashboardPage";
import { UsersPage } from "~/pages/AdminPages/UsersPage/UsersPage";
import { ReadApp } from "~/pages/ReadApp/ReadApp";

function AppRouter() {
   return (
      <BrowserRouter>
         <Routes>
            <Route element={<Layout />}>
               <Route index path={routes.home} element={<HomePage />} />
               <Route path={routes.login} element={<LoginPage />} />
               {/* <Route path={} element={}/> */}

               <Route path={routes.admin} element={<AdminRoutes />}>
                  <Route
                     index
                     element={
                        <>
                           <h1 className="text-center mt-4">Admin panel</h1>
                           <p className="text-(--gray-10) w-[40ch] mx-auto mt-4">
                              Manage users, books, and reading activity with
                              ease. The admin panel gives you full control over
                              content, progress tracking, and app settings.
                           </p>
                        </>
                     }
                  />
                  <Route path={routes.upload} element={<UploadPage />} />
                  <Route path={routes.books} element={<BooksPage />} />
                  <Route path={routes.dashboard} element={<DashboardPage />} />
                  <Route path={routes.users} element={<UsersPage />} />
               </Route>

               <Route path="*" element={<NotFoundPage />} />
            </Route>

            <Route path="read/:id" element={<ReadApp />} />
         </Routes>
      </BrowserRouter>
   );
}

export { AppRouter };
