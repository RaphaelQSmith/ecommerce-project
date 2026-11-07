import type { ShippingAddress } from "@/features/checkout/types";

export interface User {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly savedAddresses: readonly ShippingAddress[];
  /** ISO 8601 timestamp. */
  readonly createdAt: string;
}

export type AuthStatus = "anonymous" | "authenticated";
