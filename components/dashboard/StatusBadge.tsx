interface StatusBadgeProps {
    status: 'new' | 'quoted' | 'closed'
}

const statusConfig = {
    new: {
        label: '新询价',
        color: 'bg-amber-100 text-amber-700 border-amber-300',
        icon: '🟡',
    },
    quoted: {
        label: '已报价',
        color: 'bg-blue-100 text-blue-700 border-blue-300',
        icon: '🔵',
    },
    closed: {
        label: '已关闭',
        color: 'bg-green-100 text-green-700 border-green-300',
        icon: '🟢',
    },
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const config = statusConfig[status]

    return (
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
            <span>{config.icon}</span>
            <span>{config.label}</span>
        </span>
    )
}
