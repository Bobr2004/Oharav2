import { Button } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import { routes } from "~/global/config/routes.config";

function AdminLayout() {
   return (
      <>
         <ul className="flex gap-2 justify-center containerX pt-4">
            <li>
               <AdminLayoutTab to={routes.upload}>Upload</AdminLayoutTab>
            </li>
            <li>
               <AdminLayoutTab to={routes.books}>Books</AdminLayoutTab>
            </li>
            <li>
               <AdminLayoutTab to={routes.dashboard}>Dashboard</AdminLayoutTab>
            </li>
            <li>
               <AdminLayoutTab to={routes.users}>Users</AdminLayoutTab>
            </li>
         </ul>
         <div>
            <Outlet />
         </div>
      </>
   );
}

function AdminLayoutTab({ children, to }: { to: string } & PropsWithChildren) {
   const { pathname } = useLocation();

   const isSelected = pathname === to;
   return (
      <NavLink to={to}>
         <Button
            variant={isSelected ? "solid" : "soft"}
            color={isSelected ? undefined : "gray"}
         >
            {children}
         </Button>
      </NavLink>
   );
}

export { AdminLayout };
