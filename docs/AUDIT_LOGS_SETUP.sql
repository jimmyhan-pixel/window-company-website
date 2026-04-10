-- ============================================
-- Audit Logs Table Setup
-- ============================================

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  action TEXT NOT NULL,
  actor TEXT,
  actor_type TEXT NOT NULL DEFAULT 'system',
  target_type TEXT,
  target_id TEXT,
  ip_address TEXT,
  metadata JSONB
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON audit_logs(actor);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow service role all" ON audit_logs;

CREATE POLICY "Allow service role all" ON audit_logs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
