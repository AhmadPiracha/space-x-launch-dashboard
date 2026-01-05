import { X, ExternalLink, Rocket } from "lucide-react"
import { formatDate, getStatusBadge } from "../lib/launch-utils"

export default function LaunchDetails({ launch, rocketName, onClose }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} aria-label="Close dialog" />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border/50 shadow-2xl rounded-lg bg-card">
          <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border/30 bg-card/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 flex-1 pr-4">
              <Rocket className="w-6 h-6 text-accent flex-shrink-0" />
              <h2 className="text-2xl font-bold text-foreground line-clamp-2">{launch.name}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted rounded-md transition-colors flex-shrink-0 text-accent hover:text-accent/80"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-border/30">
              <span className="text-muted-foreground font-medium">Status:</span>
              {getStatusBadge(launch)}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card/40 border border-border/30 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide font-semibold">Rocket</p>
                <p className="font-semibold text-foreground">{rocketName || "Unknown"}</p>
              </div>
              <div className="bg-card/40 border border-border/30 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide font-semibold">Launch Date</p>
                <p className="font-semibold text-foreground">{formatDate(launch.date_utc)}</p>
              </div>
            </div>

            {launch.details && (
              <div className="bg-card/40 border border-border/30 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide font-semibold">Details</p>
                <p className="text-sm text-foreground leading-relaxed">{launch.details}</p>
              </div>
            )}

            <div className="space-y-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Links</p>
              <div className="flex flex-wrap gap-2">
                {launch.links?.webcast && (
                  <a
                    href={launch.links.webcast}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2 border border-accent/30 hover:border-accent hover:bg-accent/10 text-accent bg-background/50 px-3 py-2 rounded-md text-sm font-medium flex items-center inline-flex"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Watch Webcast
                  </a>
                )}
                {launch.links?.article && (
                  <a
                    href={launch.links.article}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2 border border-accent/30 hover:border-accent hover:bg-accent/10 text-accent bg-background/50 px-3 py-2 rounded-md text-sm font-medium flex items-center inline-flex"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Read Article
                  </a>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/30">
              <div className="bg-card/40 border border-border/30 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide font-semibold">
                  Flight Number
                </p>
                <p className="font-semibold text-accent">{launch.flight_number}</p>
              </div>
              <div className="bg-card/40 border border-border/30 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide font-semibold">Success</p>
                <p className="font-semibold text-foreground">
                  {launch.success === null ? "TBD" : launch.success ? "✓ Yes" : "✗ No"}
                </p>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 flex gap-2 p-6 border-t border-border/30 bg-card/80 backdrop-blur-sm">
            <button
              onClick={onClose}
              className="flex-1 border border-accent/30 hover:border-accent hover:bg-accent/10 text-accent bg-background/50 px-4 py-2 rounded-md font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
