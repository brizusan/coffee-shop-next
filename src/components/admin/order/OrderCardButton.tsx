"use client";
import { useFormStatus } from "react-dom";
import { CompleteIcon } from "../../ui/icons/Icons";

export const OrderCardButton = () => {
  const status = useFormStatus();
  return (
    <button 
      type="submit"
      className="w-7 h-7 text-red-500 hover:text-red-600"
      disabled={status.pending}
    >
      {
        status.pending ? 'completando pedido' :
      <CompleteIcon />
      }
    </button>
  );
};
