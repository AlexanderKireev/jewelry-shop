import { createServerSide } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const from = parseInt(searchParams.get("from") || "0");
    const limit = parseInt(searchParams.get("limit") || "6");
    const to = from + limit - 1;

    const supabase = await createServerSide();

    let query = supabase
      .from("products")
      .select("*", { count: "exact" })
      .or(`category_slug.eq.${slug},sub_category_slug.eq.${slug}`);

    const minPrice = searchParams.get("min_price");
    const maxPrice = searchParams.get("max_price");

    if (minPrice) query = query.gte("price", Number(minPrice));
    if (maxPrice) query = query.lte("price", Number(maxPrice));

    searchParams.forEach((value, key) => {
      if (["slug", "from", "limit", "min_price", "max_price"].includes(key)) return;

      const values = searchParams.getAll(key);
      if (values.length > 0) {
        query = query.in(key, values);
      }
    });

    const { data, error } = await query
      .order("created_at", { ascending: false })
      .order("id", { ascending: true })
      .range(from, to);

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (err) {
    console.error("API FILTER ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
