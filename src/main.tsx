import { createRoot } from "react-dom/client";
import "./index.css";
import { Theme } from "@radix-ui/themes";
import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
   <Theme appearance="light" accentColor="purple">
      <App />
   </Theme>
);
