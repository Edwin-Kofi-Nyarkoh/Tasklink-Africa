import { Users, CheckCircle, Star } from "lucide-react"

export function HeroStats() {
  const stats = [
    {
      icon: Users,
      value: "10K+",
      label: "Verified Workers",
    },
    {
      icon: CheckCircle,
      value: "50K+",
      label: "Jobs Completed",
    },
    {
      icon: Star,
      value: "4.9",
      label: "Average Rating",
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-8">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-2 mx-auto">
            <stat.icon className="w-6 h-6 text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground">{stat.value}</div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
