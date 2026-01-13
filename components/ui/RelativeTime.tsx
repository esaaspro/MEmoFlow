"use client";

import { useMounted } from "@/lib/hooks/useMounted";
import { formatRelativeTime } from "@/lib/utils/dateFormatter";

interface RelativeTimeProps {
  date: string | Date;
  fallback?: string;
}

/**
 * Component that safely renders relative time to avoid hydration mismatches
 * Only renders the formatted date after component has mounted on client
 */
export function RelativeTime({ date, fallback = "..." }: RelativeTimeProps) {
  const mounted = useMounted();

  if (!mounted) {
    return <span>{fallback}</span>;
  }

  return <span>{formatRelativeTime(date)}</span>;
}

