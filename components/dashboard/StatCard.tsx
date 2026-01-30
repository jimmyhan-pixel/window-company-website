interface StatCardProps {
    icon: string
    title: string
    value: number | string
    subtitle: string
    color: 'amber' | 'blue' | 'green' | 'purple'
    onClick?: () => void
}

const colorClasses = {
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    blue: 'bg-blue-50 text-blue-700 border-amber-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
}

export default function StatCard({ icon, title, value, subtitle, color, onClick }: StatCardProps) {
    return (
        <div
            onClick={onClick}
            className={`${colorClasses[color]} border-2 rounded-lg p-6 ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''
                }`}
        >
            <div className="text-3xl mb-2">{icon}</div>
            <div className="text-sm font-medium opacity-80 mb-1">{title}</div>
            <div className="text-3xl font-bold mb-1">{value}</div>
            <div className="text-xs opacity-70">{subtitle}</div>
        </div>
    )
}
