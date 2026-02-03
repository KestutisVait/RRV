// utils/swipe.ts
export function scrollSnap() {
  if (typeof window === 'undefined') return;

  const handler = (e) => {
    console.log('touched');
  };

  window.addEventListener('touchstart', handler, { passive: true });

  return () => {
    window.removeEventListener('touchstart', handler);
  };
}
