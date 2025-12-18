import { supabase } from "@/lib/supabase/client";

export default async function DebugPage() {
  const { data, error } = await supabase
    .from("properties")
    .select("id,title,slug,status,price_mxn,lat,lng")
    .limit(5);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Debug Supabase</h1>
      {error && <pre className="mt-4 text-sm">{JSON.stringify(error, null, 2)}</pre>}
      <pre className="mt-4 text-sm">{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
