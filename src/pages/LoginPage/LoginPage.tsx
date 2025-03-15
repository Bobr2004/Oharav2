import { Button } from "@radix-ui/themes";

function LoginPage() {
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
                  <Button variant="soft" color="gray" size="4">
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
