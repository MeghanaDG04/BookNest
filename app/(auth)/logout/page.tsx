import { signout } from "@/lib/auth-actions";

export default async function LogoutPage() {
  await signout();
  return null;
}
