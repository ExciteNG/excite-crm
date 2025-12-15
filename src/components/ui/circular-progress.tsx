import { cn } from "@/src/lib/utils";

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  backgroundColor?: string;
  progressColor?: string;
  showValue?: boolean;
}

export default function CircularProgress({
  value,
  size = 120,
  strokeWidth = 8,
  className,
  backgroundColor = "hsl(var(--muted))",
  progressColor = "hsl(var(--primary))",
  showValue = true,
}: CircularProgressProps) {
  // Calculate the radius and circumference
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate the progress offset
  const progressOffset = circumference - (value / 100) * circumference;

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.3s ease",
          }}
        />
      </svg>

      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-semibold">{Math.round(value)}%</span>
        </div>
      )}
    </div>
  );
}
