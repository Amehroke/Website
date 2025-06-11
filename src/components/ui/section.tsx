import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
}

export function Section({ children, className, id, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("section-padding", className)}
      {...props}
    >
      <div className="container-padding mx-auto max-w-7xl">
        {children}
      </div>
    </section>
  );
} 