export const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }
  
  export const getStatusBadge = (launch) => {
    let statusClass = "bg-muted text-muted-foreground"
    let statusText = "TBD"
  
    if (launch.upcoming) {
      statusClass = "bg-blue-500/20 text-blue-400 border border-blue-500/30"
      statusText = "Upcoming"
    } else if (launch.success === true) {
      statusClass = "bg-green-500/20 text-green-400 border border-green-500/30"
      statusText = "Success"
    } else if (launch.success === false) {
      statusClass = "bg-red-500/20 text-red-400 border border-red-500/30"
      statusText = "Failed"
    }
  
    return <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusClass}`}>{statusText}</span>
  }
  