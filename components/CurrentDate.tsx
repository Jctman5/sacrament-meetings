'use client';

import { useSyncExternalStore } from 'react';

const subscribe = (): (() => void) => () => {};

function getSnapshot(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// Empty on the server so the date always reflects the viewer's own clock.
const getServerSnapshot = (): string => '';

export default function CurrentDate() {
  const text = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <p className="min-h-6 text-sm text-muted">{text}</p>;
}
