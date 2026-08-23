export function SpoonIcon({ className, size = 24, fill = "none" }: { className?: string, size?: number | string, fill?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill={fill} 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M17.5 2.5c-3.1 0-6.7 2.1-7.8 5.4-.5 1.5-.2 3.1.6 4.2L2.5 19.9c-.6.6-.6 1.6 0 2.2.6.6 1.6.6 2.2 0l7.8-7.8c1.1.8 2.7 1.1 4.2.6 3.3-1.1 5.4-4.7 5.4-7.8 0-2.6-2-4.6-4.6-4.6z"/>
    </svg>
  );
}
