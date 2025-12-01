import { cn } from "@/lib/utils";
import { Source } from "@/lib/types";
import { LinkIcon } from "lucide-react";
import Link from "next/link";

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  isMilestone?: boolean;
  source: Source;
  isLast?: boolean;
}

export function Timeline({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>;
}

export function TimelineItem({
  date,
  title,
  description,
  isMilestone = false,
  source,
  isLast = false,
}: TimelineItemProps) {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex-shrink-0 w-4 h-4 rounded-full",
            isMilestone ? "bg-primary" : "bg-muted-foreground"
          )}
        />
        {!isLast && <div className="w-px h-full bg-border" />}
      </div>
      <div className="pb-8">
        <p className="text-sm text-muted-foreground">{date}</p>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-muted-foreground mt-1">{description}</p>
        <Link
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2"
        >
          <LinkIcon className="w-3 h-3" />
          {source.label}
        </Link>
      </div>
    </div>
  );
}
