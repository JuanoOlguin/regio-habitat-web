type HeadingLevel = "h1" | "h2";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  as?: HeadingLevel;
  eyebrow?: string;
}

export function SectionTitle({ title, subtitle, as = "h2", eyebrow }: SectionTitleProps) {
  const Tag = as;

  return (
    <div className="space-y-3">
      {eyebrow ? <span className="pill">{eyebrow}</span> : null}
      <div className="space-y-2">
        <Tag className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </Tag>
        {subtitle ? <p className="text-sm text-slate-600 sm:text-base">{subtitle}</p> : null}
      </div>
    </div>
  );
}
