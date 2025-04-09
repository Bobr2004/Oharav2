import { Button, Spinner } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { PDFDocumentProxy } from "pdfjs-dist";
import { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams } from "react-router";
import { getBookById } from "~/global/firebaseFunctions/db";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
   "pdfjs-dist/build/pdf.worker.min.mjs",
   import.meta.url
).toString();

const options = {
   cMapUrl: "/cmaps/",
   standardFontDataUrl: "/standard_fonts/"
};

const resizeObserverOptions = {};

const maxWidth = 600;

function ReadApp() {
   const { id } = useParams();
   if (!id) return <>Book not found</>;

   const { data: book, isPending } = useQuery({
      queryKey: ["read", `read/${id}`],
      queryFn: async () => getBookById(id)
   });

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

   return (
      <div>
         <aside className="fixed -top-1 left-0 bg-white border-1 border-(gray-8) p-4 rounded-(--radius-2) z-10">
            <nav>
               <ul>
                  <li>Розробка Богданів</li>
                  <li>Математика</li>
                  <li>Розробка Богданів</li>
               </ul>
            </nav>
            <div className="absolute -bottom-10">
               <Button className="">
                  <i className="pi pi-angle-down" />
               </Button>
            </div>
         </aside>
         <div>
            {isPending && <Spinner size="3" />}
            {book && (
               <div ref={setContainerRef}>
                  <Document
                     file={book.pdfURL}
                     onLoadSuccess={onDocumentLoadSuccess}
                     options={options}
                  >
                     <div className="flex gap-2 justify-center">
                        <Page
                           pageNumber={currentPage}
                           width={
                              containerWidth
                                 ? Math.min(containerWidth, maxWidth)
                                 : maxWidth
                           }
                        />
                        <Page
                           pageNumber={currentPage + 1}
                           width={
                              containerWidth
                                 ? Math.min(containerWidth, maxWidth)
                                 : maxWidth
                           }
                        />
                     </div>
                  </Document>
               </div>
            )}
         </div>
         <div className="">
            <div className="flex gap-2 justify-center p-4">
               <Button onClick={prevPage} variant="soft" color="gray">
                  Prev
               </Button>
               <Button onClick={nextPage} variant="soft" color="gray">
                  Next
               </Button>
            </div>
         </div>
      </div>
   );
}

export { ReadApp };
