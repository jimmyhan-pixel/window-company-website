# Supabase Security Review Checklist

This project now uses server-side APIs plus `SUPABASE_SERVICE_ROLE_KEY` for all writes and all dashboard reads.

Use this checklist in Supabase Dashboard after every schema or policy change.

## 1. Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL` is correct
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
- `SUPABASE_SERVICE_ROLE_KEY` exists in production
- `SUPABASE_SERVICE_ROLE_KEY` is never exposed to the browser

## 2. Quotes Table (`quotes`)

Expected security model:

- Public users do **not** read or write `quotes` directly
- Dashboard users do **not** query Supabase directly from the browser
- Server-side API routes use `SUPABASE_SERVICE_ROLE_KEY`

Expected RLS result:

- No `public`, `anon`, or `authenticated` read policies
- No `public`, `anon`, or `authenticated` insert policies
- One `service_role` policy allowing server-side access

Recommended SQL:

```sql
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert" ON quotes;
DROP POLICY IF EXISTS "Allow public read" ON quotes;
DROP POLICY IF EXISTS "Allow anonymous insert" ON quotes;
DROP POLICY IF EXISTS "Allow authenticated read" ON quotes;
DROP POLICY IF EXISTS "Allow authenticated update" ON quotes;
DROP POLICY IF EXISTS "Allow authenticated delete" ON quotes;
DROP POLICY IF EXISTS "Allow service role all" ON quotes;

CREATE POLICY "Allow service role all" ON quotes
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
```

## 3. Page Views Table (`page_views`)

Expected security model:

- Browser calls `/api/analytics/page-view`
- Server-side route writes into `page_views` with `SUPABASE_SERVICE_ROLE_KEY`
- Dashboard stats read through server-side route only

Expected RLS result:

- No public read
- No public insert
- One `service_role` policy allowing server-side access

Recommended SQL:

```sql
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert" ON page_views;
DROP POLICY IF EXISTS "Allow public read" ON page_views;
DROP POLICY IF EXISTS "Allow service role all" ON page_views;

CREATE POLICY "Allow service role all" ON page_views
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
```

## 4. Storage Bucket (`product-images`)

Expected security model:

- Bucket stays `Public`
- Website reads product images publicly
- Upload and delete happen only through server-side API using `SUPABASE_SERVICE_ROLE_KEY`
- No browser-direct upload policies

Recommended storage policy cleanup:

```sql
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;

CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');
```

Check in Storage UI:

- Bucket name is `product-images`
- Bucket is marked `Public`
- No extra upload/delete policies were added for `anon` or `authenticated`

## 5. Manual Dashboard Checks

- Dashboard loads quotes successfully
- Dashboard stats still load
- Image upload still works
- Image delete still works
- Quotation submit still writes to database

## 6. Residual Risk Notes

- `service_role` bypasses RLS, so server routes must stay authenticated and hardened
- If a future developer switches dashboard fetching to client-side Supabase calls, these policies will block access
- Keep `SUPABASE_SERVICE_ROLE_KEY` only in server runtime and deployment secrets
