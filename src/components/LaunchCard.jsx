import { ChevronRight } from "lucide-react"
import { formatDate, getStatusBadge } from "../lib/launch-utils"

export default function LaunchCard({ launch, rocketName, onClick }) {
  return (
    <div
      className="overflow-hidden hover:border-accent transition-all group hover:shadow-lg hover:shadow-accent/20 border border-border/50 backdrop-blur-sm rounded-lg bg-card p-5"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2 text-base flex-1">
          {launch.name}
        </h3>
        {getStatusBadge(launch)}
      </div>

      <p className="text-sm text-muted-foreground mb-4 font-medium">{rocketName || "Unknown Rocket"}</p>

      <div className="space-y-3 mb-5 pb-4 border-b border-border/30">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Launch Date</p>
          <p className="text-sm font-semibold text-foreground">{formatDate(launch.date_utc)}</p>
        </div>
      </div>

      <button
        className="w-full bg-background/50 border border-accent/30 hover:border-accent hover:bg-accent/10 text-accent group-hover:text-accent transition-all gap-2 p-2 rounded-md text-sm font-medium flex items-center justify-center cursor-pointer"
        onClick={onClick}
      >
        View Details
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
