import type { LucideIcon } from 'lucide-react';

interface IconContainerProps {
  icon: LucideIcon;
  tint?: 'green' | 'gold';
  isDark?: boolean; // Set to true if the parent section/container backdrop is dark
  className?: string;
  sizeClass?: string; // Default to w-12 h-12
  strokeWidth?: number; // Default to 1.95
  children?: React.ReactNode;
}

export default function IconContainer({
  icon: Icon,
  tint = 'green',
  isDark = false,
  className = '',
  sizeClass = 'w-12 h-12',
  strokeWidth = 1.95,
  children,
}: IconContainerProps) {
  const bgClass = isDark
    ? tint === 'green'
      ? 'bg-[#7ab88a]/10 border-[#7ab88a]/20'
      : 'bg-[#dfb15b]/10 border-[#dfb15b]/20'
    : tint === 'green'
      ? 'bg-[#7ab88a]/10 border-[#7ab88a]/20'
      : 'bg-[#dfb15b]/10 border-[#dfb15b]/20';

  const iconColorClass = isDark ? 'text-white' : 'text-[#1f2a1d]';

  return (
    <div
      className={`rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${sizeClass} ${bgClass} ${className}`}
    >
      <Icon className={`w-5 h-5 ${iconColorClass}`} strokeWidth={strokeWidth} />
      {children}
    </div>
  );
}
