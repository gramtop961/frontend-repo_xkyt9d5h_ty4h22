export default function Stepper({ step }) {
  const steps = [
    { id: 1, label: "Upload" },
    { id: 2, label: "Select" },
    { id: 3, label: "Results" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4">
      <ol className="flex items-center justify-center gap-3 md:gap-6">
        {steps.map((s, i) => {
          const active = step === s.id;
          const done = step > s.id;
          return (
            <li key={s.id} className="flex items-center gap-2">
              <span className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium border ${
                active
                  ? "bg-fuchsia-600 text-white border-fuchsia-500"
                  : done
                  ? "bg-neutral-800 text-white border-neutral-700"
                  : "bg-neutral-900 text-neutral-400 border-neutral-800"
              }`}>
                {s.id}
              </span>
              <span className={`text-sm ${active ? "text-white" : "text-neutral-400"}`}>{s.label}</span>
              {i < steps.length - 1 && <span className="mx-2 w-10 h-px bg-neutral-800 hidden md:block" />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
