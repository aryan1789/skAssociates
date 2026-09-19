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

  // Cheap read against a real table. An empty result (RLS) still counts as activity.
  const response = await fetch(`${url}/rest/v1/portal_folders?select=id&limit=1`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });

  return res.status(response.ok ? 200 : 502).json({ ok: response.ok, status: response.status });
}
