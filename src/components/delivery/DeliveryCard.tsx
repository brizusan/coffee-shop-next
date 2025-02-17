"use client";

import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Order } from "@prisma/client";
import Image from "next/image";

export const DeliveryCard = ({ order }: { order: Order }) => {
  console.log(order.date);

  const formateDate = () => {
    const date = new Date(order.date!);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = () => {
    const date = new Date(order.date!);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };

  return (
    <div className="bg-white py-10 px-6 rounded-xl shadow space-y-8">
      <div>
        <h3 className="text-center text-lg text-slate-950 font-bold font-mono">
          Entrega de Pedido - CoffeShop
        </h3>
        <p className="text-sm text-center font-semibold font-mono text-slate-500">
          Identificador de Pedido <span>#{order.id}</span>
        </p>
      </div>
      <div className="flex  justify-center text-center gap-4   text-sm text-slate-950 font-semibold font-mono">
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <UserIcon
              className="h-4 w-4 inline-block items-center text-gray-400"
              aria-hidden="true"
            />
            <p className="text-gray-700">Cliente</p>
          </div>
          <span className="text-gray-400 ">cesar zubilete</span>
          <div className="flex items-center gap-1">
            <ClockIcon
              className="h-4 w-4 inline-block items-center text-gray-400"
              aria-hidden="true"
            />
            <p className="text-gray-700">Hora de Pedido</p>
          </div>
          <span className="text-gray-400 ">{formatTime()}</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <CalendarIcon
              className="h-4 w-4 inline-block items-center text-gray-400"
              aria-hidden="true"
            />
            <p className="text-gray-700">Fecha</p>
          </div>
          <span>{formateDate()}</span>
          <div className="flex items-center gap-1">
            <ShieldCheckIcon
              className="h-4 w-4 inline-block items-center text-gray-400"
              aria-hidden="true"
            />
            <p className="text-gray-700">Pedido Validado</p>
          </div>
          <span>WEB / DELIVERY / PRESENCIAL</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <MapPinIcon
          className="h-4 w-4 inline-block items-center text-gray-400"
          aria-hidden="true"
        />
        <p className="text-gray-700">Direccion</p>
        <span className="text-gray-400 ">Av.Libertad 123</span>
      </div>
      <div className="w-full h-px border-b border-dotted border-gray-300"></div>
      <Image
        className="mx-auto"
        alt="qr de pedido"
        src={`/icon_qr.svg`}
        width={120}
        height={120}
      />
      <small className="block text-center italic">
        Gracias por su compra cliente , esperamos que disfrute su pedido!
      </small>
    </div>
  );
};
