import { AdminLayout } from "~/pages/AdminPages/AdminLayout";
import { NotAuthorizedPage } from "~/pages/NotAuthorizedPage";

function AdminRoutes() {
   const Oleg = true;
   return <>{Oleg ? <AdminLayout /> : <NotAuthorizedPage />}</>;
}

export { AdminRoutes };
