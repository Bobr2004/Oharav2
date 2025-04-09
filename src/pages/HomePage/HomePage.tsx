import { Button, Card, Separator, Spinner } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { ImageWithLoader } from "~/components/ImageWithLoader";
import { routes } from "~/global/config/routes.config";
import { Book, getAllBooks } from "~/global/firebaseFunctions/db";

function HomePage() {
   const { data: books, isPending } = useQuery({
      queryKey: ["books"],
      queryFn: getAllBooks
   });

   return (
      <>
         <section className="containerX pt-8">
            <h2>Recently added:</h2>
            {isPending && (
               <p>
                  <Spinner size="3" />
               </p>
            )}
            {books && (
               <div className="grid grid-cols-4 gap-2 p-4">
                  {books.map((book) => (
                     <BookCard {...book} />
                  ))}
               </div>
            )}
         </section>
      </>
   );
}

function BookCard(book: Book) {
   const bookTitle = book.name.slice(0, 18);
   return (
      <Card asChild>
         <Link to={routes.read(book.id)}>
            <div className="w-full h-60 overflow-hidden">
               <ImageWithLoader src={book.coverURL} />
            </div>
            <h3>{bookTitle}</h3>
            <Button className="!w-full" variant="soft">
               Read
            </Button>
            <div className="flex gap-4 items-center mt-2">
               <Separator className="!flex-grow !w-full" />
               <i className="pi pi-angle-down text-(--gray-9)" />
               <Separator className="!flex-grow !w-full" />
            </div>
         </Link>
      </Card>
   );
}

export { HomePage };
