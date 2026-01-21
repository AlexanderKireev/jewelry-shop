import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createServerSide = async () => {
  const cookieStore = await cookies(); // В 2026 году здесь обязателен await

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
      },
    },
  );
};
