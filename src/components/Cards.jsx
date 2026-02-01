export function SpeakerCard({ name, title, img, tag }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:-translate-y-0.5 transition">
      <div className="aspect-4/3 bg-white/5 grid place-items-center">
        {img ? <img src={img} alt={name} className="h-full w-full object-cover"/> : <span className="opacity-40">Photo</span>}
      </div>
      <div className="p-4">
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-xs opacity-80">{title}</p>
        {tag && <span className="inline-block mt-2 text-[11px] px-2 py-1 rounded bg-lap-amber/20 text-lap-amber">{tag}</span>}
      </div>
    </div>
  );
}

export function EventCard({ name, when, where, desc }) {
  return (
    <div className="rounded-2xl p-5 bg-white/5 border border-white/10 space-y-2">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm opacity-85">{desc}</p>
      <p className="text-xs opacity-70">{when} · {where}</p>
    </div>
  );
}

export function SponsorTile({ name, tier="Partner" }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-5 grid place-items-center">
      <div className="text-center">
        <p className="font-semibold">{name}</p>
        <p className="text-xs opacity-70">{tier}</p>
      </div>
    </div>
  );
}

export function TeamCard({ name, role, img }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
      <div className="aspect-square bg-white/5 grid place-items-center">
        {img ? <img src={img} alt={name} className="h-full w-full object-cover"/> : <span className="opacity-40">Photo</span>}
      </div>
      <div className="p-4">
        <p className="font-semibold">{name}</p>
        <p className="text-xs opacity-80">{role}</p>
      </div>
    </div>
  );
}
