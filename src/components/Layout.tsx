import { Avatar, Button } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { NavLink, Outlet, useNavigate } from "react-router";
import { routes } from "~/global/config/routes.config";
import { currentUserAtom } from "~/store/atoms";
import { Popup } from "./Popup";
import { useMutation } from "@tanstack/react-query";
import { logOut } from "~/global/firebaseFunctions/auth";

function Layout() {
   const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

   const navigate = useNavigate();

   const { mutate: handleLogOut, isPending } = useMutation({
      mutationFn: logOut,
      onSuccess: () => {
         setCurrentUser(null);
         navigate(routes.login);
      }
   });

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
                     {!currentUser ? (
                        <NavLink
                           to={routes.login}
                           className="flex items-center"
                        >
                           <Button variant="soft" color="gray">
                              Log in/Sign up
                           </Button>
                        </NavLink>
                     ) : (
                        <>
                           <Popup
                              trigger={
                                 <Button variant="ghost" color="gray">
                                    <Avatar
                                       src={currentUser.photoURL}
                                       size="2"
                                       fallback={currentUser.name.slice(0, 1)}
                                    />
                                 </Button>
                              }
                              content={
                                 <div className="flex flex-col gap-2">
                                    <NavLink
                                       to={routes.admin}
                                       className="flex justify-center"
                                    >
                                       <Button variant="ghost" color="gray">
                                          Admin panel
                                       </Button>
                                    </NavLink>
                                    <Button variant="ghost" color="gray">
                                       Continue <i className="pi pi-history"/>
                                    </Button>
                                    <Button
                                       variant="ghost"
                                       color="gray"
                                       onClick={() => handleLogOut()}
                                       loading={isPending}
                                    >
                                       Log out <i className="pi pi-sign-out"/>
                                    </Button>
                                 </div>
                              }
                           />
                        </>
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
