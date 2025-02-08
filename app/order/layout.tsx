import { OrderSidebar, OrderSummary } from "@/src/components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <section className="md:flex">
        <OrderSidebar />

        <main className="flex-1 md:h-screen md:overflow-y-scroll p-4">
          {children}
        </main>

        <OrderSummary />
      </section>
    
    </>
  )
}