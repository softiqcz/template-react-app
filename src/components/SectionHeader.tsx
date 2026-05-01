import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: SectionHeaderProps) {
  if (!title) {
    return null;
  }

  return (
    <div className={cn("site-container section-header", className)}>
      {eyebrow && <p className="section-header-eyebrow">{eyebrow}</p>}
      <h2 className="section-header-title">{title}</h2>
      {description && (
        <p className="section-header-description">{description}</p>
      )}
    </div>
  );
}
