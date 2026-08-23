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
      <path d="M7 17l8.6-8.6c1.2-1.2 3.1-1.2 4.3 0 1.2 1.2 1.2 3.1 0 4.3L11.3 21.3c-.8.8-2.1.8-2.9 0l-1.4-1.4c-.8-.8-.8-2.1 0-2.9z" />
      <path d="M15.6 8.4L2.4 21.6" />
    </svg>
  );
}
