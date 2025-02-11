import { AdminRoute } from "./AdminRoute";

const adminNavigation = [
  { url: "/admin/orders", text: "Ordenes", blank: false },
  { url: "/admin/products", text: "Productos", blank: false },
  { url: "/order/cafe", text: "Ver Quiosco", blank: true },
];

export const AdminSidebar =()=> {
  return (
    <>
      <div className="space-y-3 ">
        <p className="mt-10 uppercase font-bold font-serif text-sm text-gray-600 text-center">
          Panel de administración 
          <span className="block text-amber-400 font-sans">Coffee Shop</span> 
        </p>
        <nav className="flex flex-col pt-8">
          {
            adminNavigation.map((route) => (
              <AdminRoute
                key={route.url} 
                {...route}
              />
            ))
          }
        </nav>
      </div>
    </>
  );
}
