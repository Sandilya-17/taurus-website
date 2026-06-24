import { useEffect, useRef } from 'react';

export default function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible'); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`fade-up fade-up-delay-${delay} ${className}`}>
      {children}
    </div>
  );
}
