// Called by a Vercel Cron job (see vercel.json) so the Supabase free-tier
// project sees regular database activity and doesn't get paused.
export default async function handler(req, res) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.authorization !== `Bearer ${secret}`) {
    return res.status(401).json({ ok: false });
  }

  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return res.status(500).json({ ok: false, error: 'Missing Supabase env vars' });
  }

  // Cheap reads against real tables. An empty result (RLS) still reaches the database.
  const responses = await Promise.all(
    ['portal_folders', 'portal_files'].map((table) =>
      fetch(`${url}/rest/v1/${table}?select=id&limit=1`, {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
      })
    )
  );
  const ok = responses.every((response) => response.ok);
  const statuses = responses.map((response) => response.status);

  // Logged so a run shows up in Vercel's runtime logs.
  console.log('keep-alive', statuses);
  return res.status(ok ? 200 : 502).json({ ok, statuses });
}
