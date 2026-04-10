# Security Launch Checklist

Use this checklist before deploying to production.

## 1. Secrets and Environment Variables

- [ ] `SESSION_SECRET` is set and is at least 32 characters
- [ ] `DASHBOARD_USERNAME` is set
- [ ] `DASHBOARD_PASSWORD` is set
- [ ] `RESEND_API_KEY` is set
- [ ] `COMPANY_EMAIL` is set
- [ ] `NEXT_PUBLIC_SUPABASE_URL` is set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` exists only in server-side deployment secrets

## 2. Session and Dashboard Access

- [ ] Dashboard login works
- [ ] Dashboard logout works
- [ ] Session expires as expected
- [ ] Dashboard pages redirect to login when not authenticated
- [ ] Login rate limiting returns `429` after repeated failures

## 3. Quote Submission Safety

- [ ] Invalid email is rejected by the server
- [ ] Invalid dimensions are rejected by the server
- [ ] Invalid quantity is rejected by the server
- [ ] Invalid material/window type combinations are rejected
- [ ] Invalid grouped quotation payloads are rejected
- [ ] New quotation still saves successfully

## 4. Image Upload Safety

- [ ] Upload only works when logged into Dashboard
- [ ] Invalid `productId` is rejected
- [ ] Unsupported file types are rejected
- [ ] Fake image files are rejected by magic-byte validation
- [ ] Delete only works for allowed `product-images` file paths
- [ ] Upload/delete rate limiting works

## 5. Supabase Security

- [ ] `quotes` RLS allows only `service_role`
- [ ] `page_views` RLS allows only `service_role`
- [ ] `product-images` bucket is public-read only
- [ ] No public upload/delete storage policies remain
- [ ] `project_address` column exists on `quotes`
- [ ] `audit_logs` table exists

Reference:

- [SUPABASE_SECURITY_REVIEW.md](/Users/hh/project/window-company-website/docs/SUPABASE_SECURITY_REVIEW.md)
- [AUDIT_LOGS_SETUP.sql](/Users/hh/project/window-company-website/docs/AUDIT_LOGS_SETUP.sql)

## 6. Security Headers

- [ ] `Content-Security-Policy` is present
- [ ] `Referrer-Policy` is present
- [ ] `X-Content-Type-Options: nosniff` is present
- [ ] `X-Frame-Options: DENY` is present
- [ ] `Permissions-Policy` is present
- [ ] Site still loads correctly in production after headers are applied

## 7. Monitoring and Audit

- [ ] `/api/health` returns `200`
- [ ] `/api/health` shows all critical checks passing
- [ ] Audit logs are being written for login success/failure
- [ ] Audit logs are being written for quote submissions
- [ ] Audit logs are being written for image uploads/deletes

Reference:

- [OPERATIONS_RUNBOOK.md](/Users/hh/project/window-company-website/docs/OPERATIONS_RUNBOOK.md)

## 8. Backup Readiness

- [ ] Supabase automated backups are enabled if available on your plan
- [ ] A manual database backup process is documented
- [ ] A storage export process is documented
- [ ] Team knows how to restore recent backups

## 9. Final Smoke Test

- [ ] Visit public pages
- [ ] Submit a quotation
- [ ] Confirm company email arrives
- [ ] Confirm customer confirmation email arrives
- [ ] Confirm Dashboard shows the quotation
- [ ] Confirm quotation detail page opens
- [ ] Confirm print view still works
- [ ] Confirm image upload changes public product pages
