export const routes = {
   home: "/",

   // Users
   login: "/login",
   saved: "/saved",

   // Read
   read: (bookId: string) => `/read/${bookId}`,

   // admin
   admin: "/admin",
   upload: "/admin/upload",
   books: "/admin/books",
   dashboard: "/admin/dashboard",
   users: "/admin/users"
};
