import { Button } from "@radix-ui/themes";
import { Link } from "react-router";
import { routes } from "~/global/config/routes.config";

type NotAuthorizedPageProps = {
   message?: string;
};

function NotAuthorizedPage({
   message = "You are not allowed"
}: NotAuthorizedPageProps) {
   return (
      <>
         <section className="containerX pt-4">
            <h1 className="text-center">401</h1>
            <p className="flex items-center justify-center gap-2 mt-2">
               <span>{message}</span>
               <Link to={routes.home}>
                  <Button variant="soft">Go To Home</Button>
               </Link>
            </p>
         </section>
      </>
   );
}

export { NotAuthorizedPage };
