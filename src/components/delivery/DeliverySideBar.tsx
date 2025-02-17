import { AdminRoute } from "../admin/AdminRoute";

const deliveryNavigation = [
  { url: "/delivery", text: "Despachos", blank: false },
  { url: "/order/cafe", text: "Ver Quiosco", blank: true },
];

export const DeliverySideBar = () => {
  return (
    <>
      <div className="space-y-3 ">
        <p className="mt-10 uppercase font-bold font-serif text-sm text-gray-600 text-center">
          Panel de despachos
          <span className="block text-amber-400 font-sans">Coffee Shop</span>
        </p>
        <nav className="flex flex-col pt-8">
          {deliveryNavigation.map((route) => (
            <AdminRoute key={route.url} {...route} />
          ))}
        </nav>
      </div>
    </>
  );
};
