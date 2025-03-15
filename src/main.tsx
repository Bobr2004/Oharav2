import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRouter } from "./router/AppRouter.tsx";
import { Theme } from "@radix-ui/themes";

createRoot(document.getElementById("root")!).render(
   <Theme appearance="light" accentColor="purple">
      <AppRouter />
   </Theme>
);
