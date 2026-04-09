# Operations Runbook

This document covers the practical minimum for monitoring, audit review, and backups.

## 1. Health Check

Use this endpoint:

- `GET /api/health`

Expected:

- HTTP `200` when core services are healthy
- HTTP `503` when configuration or database connectivity is degraded

Response includes:

- `sessionSecretConfigured`
- `dashboardCredentialsConfigured`
- `resendConfigured`
- `supabaseConfigured`
- `databaseReachable`

Recommended checks:

- After every deployment
- Daily if this site is customer-facing

## 2. Audit Logs

Before using audit logs, run:

- [AUDIT_LOGS_SETUP.sql](/Users/hh/project/window-company-website/docs/AUDIT_LOGS_SETUP.sql)

The application currently logs:

- dashboard login success
- dashboard login failure
- dashboard login rate limit events
- dashboard logout
- quote submitted
- product image uploaded
- product image deleted

Recommended review cadence:

- Review failed logins weekly
- Review admin uploads/deletes weekly
- Review quote volume anomalies weekly

Useful Supabase queries:

```sql
SELECT created_at, action, actor, ip_address, metadata
FROM audit_logs
ORDER BY created_at DESC
LIMIT 100;
```

```sql
SELECT created_at, actor, ip_address
FROM audit_logs
WHERE action = 'dashboard_login_failed'
ORDER BY created_at DESC
LIMIT 50;
```

## 3. Database Backups

Recommended minimum:

- Daily automatic Supabase backup if your plan includes it
- Weekly manual export before major schema changes

Manual backup options:

### Option A: Supabase Dashboard

Use:

- `Project Settings -> Backups`

Download the latest database backup before risky changes.

### Option B: SQL Export

In Supabase SQL Editor or the database tools, export:

- `quotes`
- `page_views`
- `audit_logs`

Minimum rollback dataset:

- quotation records
- audit logs
- product image file list

## 4. Storage Backups

Bucket:

- `product-images`

Recommended minimum:

- Weekly export of the bucket contents
- Export before replacing many product images

Keep:

- file names
- upload date
- a zipped copy of image assets

## 5. Retention Guidance

Suggested defaults:

- `page_views`: keep 90 days unless business needs more
- `audit_logs`: keep 180 to 365 days
- `quotes`: keep according to business/legal needs

Example cleanup for `page_views`:

```sql
DELETE FROM page_views
WHERE viewed_at < NOW() - INTERVAL '90 days';
```

## 6. Recovery Checklist

If production data looks wrong:

1. Stop making schema changes
2. Export current affected tables
3. Check `/api/health`
4. Review `audit_logs`
5. Restore database backup if needed
6. Re-upload storage assets if bucket contents were affected
