export default function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
}) {
  return (
    <div
      className={`section-heading flex w-full max-w-4xl flex-col ${
        center ? "items-center text-center" : "items-start text-left"
      }`}
    >
      {/* EYEBROW */}

      {eyebrow && (
        <div className="mb-5 flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#1761dc]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1761dc]" />

          {eyebrow}
        </div>
      )}

      {/* TITLE */}

      <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-[#0b1b3a] sm:text-5xl lg:text-6xl">
        {title}
      </h2>

      {/* DESCRIPTION */}

      {description && (
        <p
          className={`mt-6 text-base leading-8 text-slate-500 md:text-lg ${
            center ? "mx-auto" : ""
          } max-w-2xl`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
