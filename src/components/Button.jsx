export default function Button({ children, as = "button", className="", ...props }) {
  const Comp = as;
  return (
    <Comp
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 font-medium bg-lap-red text-lap-cream hover:bg-lap-flame transition shadow-soft ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}
