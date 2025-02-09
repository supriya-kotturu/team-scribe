import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as crypto from "crypto"

export const INVITE_CODE = "team-scribe-invite-code"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateInviteCode(prefix: string = 'INV'): string {
  const randomPart = crypto.randomBytes(2).toString('hex').toUpperCase();
  const timestamp = Date.now().toString(36).slice(-4).toUpperCase();
  const code = `${prefix}-${randomPart}-${timestamp}`;

  // Add a simple checksum
  const sum = code.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const checksum = (sum % 36).toString(36).toUpperCase();

  return `${code}-${checksum}`;
}
