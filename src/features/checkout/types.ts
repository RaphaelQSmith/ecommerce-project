import type { CartItem } from "@/features/cart/types";
import type { CurrencyCode } from "@/features/products/types";

export const CHECKOUT_STEPS = [
  "cart",
  "shipping",
  "payment",
  "confirmation",
] as const;

export type CheckoutStep = (typeof CHECKOUT_STEPS)[number];

export interface ShippingAddress {
  readonly fullName: string;
  readonly email: string;
  readonly line1: string;
  readonly line2?: string;
  readonly city: string;
  readonly postalCode: string;
  /** ISO 3166-1 alpha-2 country code. */
  readonly country: string;
}

export type OrderStatus = "pending" | "paid" | "failed" | "refunded";

export type OrderLineItem = Pick<
  CartItem,
  "productId" | "name" | "unitPrice" | "quantity" | "imageUrl"
>;

export interface Order {
  readonly id: string;
  readonly items: readonly OrderLineItem[];
  readonly shippingAddress: ShippingAddress;
  readonly currency: CurrencyCode;
  /** All monetary values are in minor units (cents). */
  readonly subtotal: number;
  readonly shippingCost: number;
  readonly tax: number;
  readonly total: number;
  readonly status: OrderStatus;
  /** ISO 8601 timestamp. */
  readonly createdAt: string;
  readonly paymentLast4: string;
}
