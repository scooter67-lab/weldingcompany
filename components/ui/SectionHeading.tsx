export function SectionHeading({
  kicker,
  title,
  lead,
  align = "left",
  inverted = false,
  as: Tag = "h2",
}: {
  kicker?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  inverted?: boolean;
  as?: "h1" | "h2";
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-3xl ${alignment}`}>
      {kicker ? (
        <p
          className={`mb-3 text-sm font-semibold tracking-wide uppercase ${
            inverted ? "text-accent" : "text-brand-700"
          }`}
        >
          {kicker}
        </p>
      ) : null}
      <Tag
        className={`text-3xl leading-tight font-bold sm:text-4xl ${
          inverted ? "text-white" : "text-brand-900"
        }`}
      >
        {title}
      </Tag>
      {lead ? (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            inverted ? "text-brand-100" : "text-muted"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
