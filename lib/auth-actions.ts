"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { createClient } from "@/utils/supabase/server";

async function logAuthEvent(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  email: string,
  event: string
) {
  try {
    const headerStore = await headers();
    const ip = headerStore.get("x-forwarded-for") || headerStore.get("x-real-ip") || "unknown";
    const userAgent = headerStore.get("user-agent") || "unknown";

    await supabase.from("auth_logs").insert({
      user_id: userId,
      email,
      event,
      ip_address: ip,
      user_agent: userAgent,
    });
  } catch (err) {
    console.error("Failed to log auth event:", err);
  }
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: authData, error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  // Log the login event
  await logAuthEvent(supabase, authData.user.id, authData.user.email!, "login");

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const firstName = formData.get("first-name") as string;
  const lastName = formData.get("last-name") as string;
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        full_name: `${firstName} ${lastName}`,
        email: formData.get("email") as string,
      },
    },
  };

  const { data: authData, error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  // Log the register event
  if (authData.user) {
    await logAuthEvent(supabase, authData.user.id, authData.user.email!, "register");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signout() {
  const supabase = await createClient();

  // Get user before signing out so we can log the event
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await logAuthEvent(supabase, user.id, user.email!, "logout");
  }

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect("/login");
}

export async function signInWithGoogle() {
  const supabase = await createClient();

  const headerStore = await headers();
  const origin = headerStore.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect(data.url);
}
