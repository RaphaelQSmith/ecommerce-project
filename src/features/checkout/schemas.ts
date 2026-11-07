import { z } from "zod";
import { passesLuhn } from "@/lib/utils";

export const shippingAddressSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  line1: z.string().trim().min(3, "Enter your street address"),
  line2: z.string().trim().optional(),
  city: z.string().trim().min(2, "Enter your city"),
  postalCode: z
    .string()
    .trim()
    .min(3, "Enter a valid postal code")
    .max(10, "Enter a valid postal code"),
  country: z.string().length(2, "Select a country"),
});

export type ShippingAddressInput = z.infer<typeof shippingAddressSchema>;

function isNotExpired(value: string): boolean {
  const match = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(value);
  if (!match) return false;
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  const now = new Date();
  // A card is valid through the last day of its expiry month.
  return (
    year > now.getFullYear() ||
    (year === now.getFullYear() && month >= now.getMonth() + 1)
  );
}

export const paymentDetailsSchema = z.object({
  cardholderName: z.string().trim().min(2, "Enter the name on the card"),
  cardNumber: z
    .string()
    .transform((v) => v.replace(/\s+/g, ""))
    .refine((v) => /^\d{13,19}$/.test(v), "Enter a valid card number")
    .refine(passesLuhn, "This card number looks incorrect"),
  expiry: z
    .string()
    .trim()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use the format MM/YY")
    .refine(isNotExpired, "This card has expired"),
  cvc: z.string().regex(/^\d{3,4}$/, "Enter the 3 or 4 digit security code"),
});

export type PaymentDetailsInput = z.input<typeof paymentDetailsSchema>;
export type PaymentDetails = z.output<typeof paymentDetailsSchema>;
