import { supabaseAdmin } from '@/lib/supabase-admin'

export interface AuditLogPayload {
    action: string
    actor?: string | null
    actorType?: 'admin' | 'system' | 'visitor'
    targetType?: string | null
    targetId?: string | null
    ipAddress?: string | null
    metadata?: Record<string, unknown> | null
}

function isMissingAuditLogsTable(error: unknown) {
    const message = typeof error === 'object' && error !== null && 'message' in error
        ? String((error as { message?: unknown }).message || '')
        : ''

    return message.includes('audit_logs')
}

export async function createAuditLog({
    action,
    actor = null,
    actorType = 'system',
    targetType = null,
    targetId = null,
    ipAddress = null,
    metadata = null,
}: AuditLogPayload) {
    try {
        const { error } = await supabaseAdmin
            .from('audit_logs')
            .insert({
                action,
                actor,
                actor_type: actorType,
                target_type: targetType,
                target_id: targetId,
                ip_address: ipAddress,
                metadata,
            })

        if (error) {
            if (isMissingAuditLogsTable(error)) {
                console.warn('Audit log skipped because audit_logs table is missing')
                return
            }

            console.error('Failed to write audit log:', error)
        }
    } catch (error) {
        console.error('Audit log error:', error)
    }
}
