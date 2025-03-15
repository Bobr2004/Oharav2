import { Avatar, Button, Kbd } from "@radix-ui/themes";
import toast from "react-hot-toast";
import { NavLink, Outlet } from "react-router";
import { routes } from "~/global/config/routes.config";

function Layout() {
   return (
      <>
         <header className="bg-(--gray-2) border-b border-(--gray-6)">
            <nav className="containerX py-2 flex justify-between gap-4 items-center">
               <div className="flex gap-4 items-center">
                  <NavLink to={routes.home}>
                     <h3 className="font-Montserrat font-bold">
                        Ohara <span className="text-(--accent-10)">Math</span>
                     </h3>
                  </NavLink>
                  <NavLink to={routes.home} className="flex items-center">
                     <Button color="gray" variant="ghost">
                        <i className="pi pi-search" /> Search
                     </Button>
                  </NavLink>
               </div>

               <ul className="flex gap-4 items-center">
                  <li>
                     <NavLink to={routes.admin} className="flex items-center">
                        <Button
                           disabled
                           variant="ghost"
                           color="gray"
                           className="!text-xl"
                        >
                           <i className="pi pi-file-edit" />
                        </Button>
                     </NavLink>
                  </li>
                  <li>
                     <NavLink to={routes.saved} className="flex items-center">
                        <Button
                           variant="ghost"
                           color="gray"
                           className="!text-xl"
                        >
                           <i className="pi pi-arrow-circle-down" />
                        </Button>
                     </NavLink>
                  </li>
                  <li className="ml-2">
                     {true ? (
                        <NavLink
                           to={routes.login}
                           className="flex items-center"
                        >
                           <Button variant="soft" color="gray">
                              Login/Sign up
                           </Button>
                        </NavLink>
                     ) : (
                        <NavLink to={routes.profile}>
                           <Button
                              variant="ghost"
                              color="gray"
                              className="!text-lg !p-1"
                              radius="full"
                           >
                              <Avatar fallback="A" />
                           </Button>
                        </NavLink>
                     )}
                  </li>
               </ul>
            </nav>
         </header>
         <main className="flex flex-col">
            <Outlet />
         </main>
      </>
   );
}

export { Layout };
