"use client";

import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

import { checkoutCredits } from "@/lib/actions/transaction.action";
import { Button } from "../ui/button";

const Checkout = ({
  plan,
  amount,
  credits,
  buyerId,
}: {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
}) => {
  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast("تم تنفيذ الطلب!", {
        description: "سوف يصلك بريد إلكتروني بالتأكيد",
        duration: 5000,
      });
    }

    if (query.get("canceled")) {
      toast("تم إلغاء الطلب!", {
        description: "يمكنك الاستمرار في التصفح والشراء لاحقًا",
        duration: 5000,
      });
    }
  }, []);

  const onCheckout = async () => {
    const transaction = {
      plan,
      amount,
      credits,
      buyerId,
    };

    await checkoutCredits(transaction);
  };

  return (
    <form action={onCheckout} method="POST">
      <section>
        <Button
          type="submit"
          role="link"
          className="w-full rounded-full bg-purple-gradient bg-cover"
        >
          Buy Credit
        </Button>
      </section>
    </form>
  );
};

export default Checkout;