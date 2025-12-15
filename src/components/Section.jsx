export default function Section({ title, subtitle, children, className = "" }) {
  return (
    <section className={`max-w-6xl mx-auto px-4 ${className}`}>
      {title && (
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm opacity-80 mt-1">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
