import { Card } from "@radix-ui/themes";

function HomePage() {
   return (
      <>
         <section className="containerX pt-8">
            <h2>Recently added:</h2>
            <div className="grid grid-cols-4 gap-2">
               <Card>
                  <h3>ObamaBook</h3>
               </Card>
               <Card>
                  <h3>ObamaBook</h3>
               </Card>
               <Card>
                  <h3>ObamaBook</h3>
               </Card>
            </div>
         </section>
      </>
   );
}

export { HomePage };
