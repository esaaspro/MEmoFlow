/**
 * Format a date to a relative time string in French
 * @param date - Date string or Date object
 * @returns Relative time string (e.g., "Il y a 2 heures")
 */
export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const targetDate = typeof date === "string" ? new Date(date) : date;
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

  // Less than a minute
  if (diffInSeconds < 60) {
    return "À l'instant";
  }

  // Less than an hour
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `Il y a ${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  // Less than a day
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `Il y a ${hours} heure${hours > 1 ? "s" : ""}`;
  }

  // Less than a week
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `Il y a ${days} jour${days > 1 ? "s" : ""}`;
  }

  // Less than a month
  if (diffInSeconds < 2592000) {
    const weeks = Math.floor(diffInSeconds / 604800);
    return `Il y a ${weeks} semaine${weeks > 1 ? "s" : ""}`;
  }

  // Format as date
  return targetDate.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: targetDate.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

