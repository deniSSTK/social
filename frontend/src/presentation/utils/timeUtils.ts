export function timeAgo(timestamp: string) {
    const date = new Date(timestamp);
    const now = Date.now();
    const diffMs = now - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays >= 1) return `${diffDays} days ago`;
    if (diffHours >= 1) return `${diffHours} h. ago`;
    if (diffMinutes >= 1) return `${diffMinutes} min. ago`;
    return "right now";
}