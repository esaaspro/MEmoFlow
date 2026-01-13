import { useState, useEffect } from "react";

/**
 * Hook to detect if component has mounted on client
 * Useful for preventing hydration mismatches with Date.now() or Math.random()
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

