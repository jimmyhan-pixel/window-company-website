-- ============================================
-- Add project_address to quotes
-- ============================================
-- Run this in Supabase SQL Editor so Dashboard detail pages
-- can display the project address saved with each quotation.

ALTER TABLE quotes
ADD COLUMN IF NOT EXISTS project_address TEXT;

COMMENT ON COLUMN quotes.project_address IS 'Project/site address for the full quotation';

-- Optional check
SELECT id, quote_number, customer_name, project_address, created_at
FROM quotes
ORDER BY created_at DESC
LIMIT 20;
