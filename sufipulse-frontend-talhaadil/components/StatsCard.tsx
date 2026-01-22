interface StatsCardProps {
    title: string
    value: number | string
    icon: string
    trend?: {
      value: number
      isPositive: boolean
    }
  }
  
  export default function StatsCard({ title, value, icon, trend }: StatsCardProps) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-800">{title}</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
            {trend && (
              <div className="flex items-center mt-2">
                <span className={`text-sm font-medium ${trend.isPositive ? "text-emerald-900" : "text-red-600"}`}>
                  {trend.isPositive ? "↗" : "↘"} {Math.abs(trend.value)}%
                </span>
                <span className="text-xs text-slate-800 ml-1">vs last month</span>
              </div>
            )}
          </div>
          <div className="text-3xl">{icon}</div>
        </div>
      </div>
    )
  }
  