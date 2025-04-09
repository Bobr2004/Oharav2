import { Button } from "@radix-ui/themes";
import { useSetAtom } from "jotai";
import { signInWithGoogle } from "~/global/firebaseFunctions/auth";
import { currentUserAtom } from "~/store/atoms";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { routes } from "~/global/config/routes.config";

function LoginPage() {
   const setCurrentUser = useSetAtom(currentUserAtom);

   const navigate = useNavigate();

   const { mutate: handleLogin, isPending } = useMutation({
      mutationFn: signInWithGoogle,
      onSuccess: (userInfo) => {
         if (userInfo) setCurrentUser(userInfo);
         navigate(routes.home);
      }
   });
   return (
      <div className="flex flex-col justify-center h-full grow">
         <h1 className="containerX text-center -mt-20">
            Welcome to Ohara <b className="text-(--accent-10)">Math</b>
         </h1>
         <p className="containerX text-center mt-2">
            Sign in below (model will be able to integrate into your workflow
            directly)
         </p>
         <section className="containerX mt-6">
            <div className="flex justify-center">
               <a
               // href={application.API_URL + "/oauth2/authorization/github"}
               >
                  <Button
                     variant="soft"
                     color="gray"
                     size="4"
                     onClick={() => handleLogin()}
                     loading={isPending}
                  >
                     Continue with Google <i className="pi pi-google"></i>
                  </Button>
               </a>
            </div>
            <div className="text-center mt-2">
               <small>
                  By continuing, you agree to our{" "}
                  <u className="cursor-pointer">Terms of Service</u>
               </small>
            </div>
         </section>
      </div>
   );
}

export { LoginPage };
