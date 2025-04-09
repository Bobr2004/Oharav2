import { Button, Table } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { Popup } from "~/components/Popup";
import { getAllUsers, User } from "~/global/firebaseFunctions/db";

function UsersPage() {
   const { data: users, isPending } = useQuery({
      queryKey: ["users"],
      queryFn: getAllUsers
   });
   return (
      <section className="containerX pt-8">
         <Table.Root>
            <Table.Header>
               <Table.Row>
                  <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
               </Table.Row>
            </Table.Header>
            <Table.Body>
               {isPending && <p>Loading</p>}
               {users && users.map((user) => <TableRow {...user} />)}
            </Table.Body>
         </Table.Root>
      </section>
   );
}

function TableRow(user: User) {
   return (
      <Table.Row>
         <Table.RowHeaderCell>
            {user.name} <i className="pi pi-info-circle" title={user.id} />
         </Table.RowHeaderCell>
         <Table.Cell>{user.email}</Table.Cell>
         <Table.Cell>{user.role}</Table.Cell>
         <Table.Cell>
            <Popup
               trigger={
                  <Button className="!px-1" variant="soft" color="gray">
                     <i className="pi pi-ellipsis-v" />
                  </Button>
               }
               content={
                  <div className="flex flex-col gap-2">
                     <Button variant="soft" color="gray">
                        Promote to Admin
                     </Button>
                     <Button color="red">
                        Delete <i className="pi pi-trash" />
                     </Button>
                  </div>
               }
            />
         </Table.Cell>
      </Table.Row>
   );
}

export { UsersPage };
