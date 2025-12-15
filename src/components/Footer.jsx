export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-12">
      <div className="lap-stripe h-2 w-full" />
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm flex flex-col sm:flex-row gap-3 justify-between">
        <p className="opacity-80">
          © {new Date().getFullYear()} TEDx IIT Indore — The Uncharted Lap
        </p>
        <p className="opacity-70">
          This independent TEDx event is operated under license from TED.
        </p>
      </div>
    </footer>
  );
}
