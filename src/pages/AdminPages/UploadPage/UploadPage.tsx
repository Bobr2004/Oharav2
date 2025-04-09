import { useCallback, useEffect, useState } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { toBlob } from "html-to-image";

// import "./Sample.css";

import type { PDFDocumentProxy } from "pdfjs-dist";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { Button, TextField } from "@radix-ui/themes";
import { wait } from "~/global/utils/helpers";
import { uploadPdf, uploadPdfCover } from "~/global/firebaseFunctions/storage";
import { createPdfBook } from "~/global/firebaseFunctions/db";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
   "pdfjs-dist/build/pdf.worker.min.mjs",
   import.meta.url
).toString();

const options = {
   cMapUrl: "/cmaps/",
   standardFontDataUrl: "/standard_fonts/"
};

const resizeObserverOptions = {};

const maxWidth = 800;

function UploadPage() {
   // file states
   const [file, setFile] = useState<File | null>(null);
   const [coverFile, setCoverFile] = useState<File | null>(null);
   const coverFileSrc = coverFile ? URL.createObjectURL(coverFile) : "";

   // input states
   const [bookName, setBookName] = useState("");
   // const [authorName, setAuthorName] = useState("");

   useEffect(() => {
      if (file && file.name) {
         setBookName(file.name.slice(0, -4));
      }
   }, [file]);

   // Pdf viewer dogshit
   const [numPages, setNumPages] = useState<number>();
   const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
   const [containerWidth, setContainerWidth] = useState<number>();
   const [currentPage, setCurrentPage] = useState(1);

   const onResize = useCallback<ResizeObserverCallback>((entries) => {
      const [entry] = entries;

      if (entry) {
         setContainerWidth(entry.contentRect.width);
      }
   }, []);

   const setPageCover = async () => {
      if (containerRef) {
         const blob = (await toBlob(containerRef)) as File;
         if (blob) setCoverFile(blob);
      }
   };

   const nextPage = () => {
      if (numPages && currentPage + 1 < numPages)
         setCurrentPage(currentPage + 1);
   };

   const prevPage = () => {
      if (currentPage - 1 !== 0) setCurrentPage(currentPage - 1);
   };

   useResizeObserver(containerRef, resizeObserverOptions, onResize);

   function onDocumentLoadSuccess({
      numPages: nextNumPages
   }: PDFDocumentProxy): void {
      setNumPages(nextNumPages);
   }

   const upload = async () => {
      if (!(coverFile && file && bookName)) return;
      const coverURL = await uploadPdfCover(coverFile);
      const pdfURL = await uploadPdf(file);
      if (!(coverURL && pdfURL)) return;
      await createPdfBook({
         name: bookName,
         author: "Oleg",
         pdfURL,
         coverURL
      });
   };

   const navigate = useNavigate();

   const { mutate, isPending, isSuccess } = useMutation({
      mutationFn: upload,
      // mutationFn: async () => "nigga",
      onSuccess: async () => {
         await wait(2);
         navigate("/");
      }
   });
   return (
      <>
         <h1 className="font-montserrant text-2xl text-center my-4 font-semibold px-4">
            Upload a book
         </h1>
         <section className="max-w-[768px] mx-auto px-4">
            {!file && (
               <label>
                  <div
                     className="max-w-[450px] mx-auto border border-dashed border-(--accent-10) cursor-pointer h-60
     rounded-(--radius-4) flex flex-col gap-3
     justify-center items-center text-(--accent-10)
     hover:border-(--accent-11) hover:text-(--accent-11)"
                  >
                     <i className="pi pi-file text-3xl" />
                     <span className="text-center">Choose a pdf file</span>
                  </div>

                  <input
                     type="file"
                     className="hidden"
                     accept="application/pdf"
                     onChange={({ target }) => {
                        if (target.files) {
                           setFile(target.files[0]);
                        }
                     }}
                  />
               </label>
            )}
            {file && (
               <>
                  <div className="mt-4 max-w-[600px] mx-auto grid sm:grid-cols-[3fr_2fr] gap-4">
                     <TextField.Root
                        type="text"
                        title="Book name"
                        value={bookName}
                        onChange={({ target }) => setBookName(target.value)}
                     />
                     <TextField.Root
                        type="text"
                        title="Author (optional)"
                        value={""}
                        onChange={({ target }) => setBookName(target.value)}
                     />
                  </div>
                  <div className="sm:grid sm:grid-cols-2 gap-4">
                     <div className="p-4 w-full">
                        <h3 className="text-center text-lg mb-2">
                           Pdf preview
                        </h3>
                        <div className="border border-stone-200">
                           <div ref={setContainerRef} className="w-full">
                              <Document
                                 file={file}
                                 onLoadSuccess={onDocumentLoadSuccess}
                                 options={options}
                              >
                                 <Page
                                    pageNumber={currentPage}
                                    width={
                                       containerWidth
                                          ? Math.min(containerWidth, maxWidth)
                                          : maxWidth
                                    }
                                 />
                              </Document>
                           </div>
                        </div>
                        <div className="flex justify-center px-4 my-2">
                           <Button
                              onClick={prevPage}
                              className="rounded-r-none"
                           >
                              <i className="pi pi-arrow-left"></i>
                           </Button>
                           <Button
                              onClick={nextPage}
                              className="rounded-l-none"
                           >
                              <i className="pi pi-arrow-right"></i>
                           </Button>
                        </div>
                        <div className="flex justify-center">
                           <Button onClick={setPageCover}>
                              Select this page as a cover
                           </Button>
                        </div>
                     </div>

                     <div className="p-4 w-full flex flex-col">
                        <h3 className="text-center text-lg mb-2">Cover</h3>
                        <div className="grow flex flex-col">
                           {coverFileSrc ? (
                              <>
                                 <img
                                    src={coverFileSrc}
                                    className="border border-stone-200"
                                 />
                              </>
                           ) : (
                              <label
                                 htmlFor="coverInput"
                                 className="bg-stone-800/50 h-full min-h-[100px] grow flex justify-center items-center"
                              >
                                 <div>Cover is not selected</div>
                              </label>
                           )}
                        </div>
                        <div className="flex justify-center mt-2">
                           <Button
                              onClick={() => {
                                 document.getElementById("coverInput")?.click();
                              }}
                           >
                              Set a custom cover
                           </Button>
                           <input
                              type="file"
                              className="hidden"
                              id="coverInput"
                              onChange={({ target }) => {
                                 if (target.files) {
                                    setCoverFile(target.files[0]);
                                 }
                              }}
                           />
                        </div>
                     </div>
                  </div>
                  {isPending && (
                     <div className="flex gap-4 justify-end mb-4">
                        <span>Uploading</span>
                        <i className="pi pi-cog pi-spin"></i>
                     </div>
                  )}
                  {isSuccess && (
                     <div className="flex gap-4 justify-end mb-4 text-emerald-500">
                        <span>Well done my nigga</span>
                        <i className="pi pi-thumbs-up-fill"></i>
                     </div>
                  )}
                  {!(isPending || isSuccess) && (
                     <div className="flex gap-4 justify-end mb-4">
                        <Button onClick={() => setFile(null)}>
                           Remove pdf
                        </Button>
                        <Button onClick={() => mutate()}>Upload</Button>
                     </div>
                  )}
               </>
            )}
         </section>
      </>
   );
}

export { UploadPage };
