import { useState } from "react";
import { FilePicker } from "~/components/FilePicker";

function UploadPage() {
   const [_, setBookFile] = useState<File | null>(null);

   return (
      <section className="containerX pt-8">
         <h1>Upload a new book</h1>
         <FilePicker setFileState={setBookFile} />
      </section>
   );
}

export { UploadPage };
