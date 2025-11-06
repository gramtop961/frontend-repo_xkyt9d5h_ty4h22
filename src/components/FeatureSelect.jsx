import { useMemo, useState } from "react";
import { Target, Settings2 } from "lucide-react";

export default function FeatureSelect({ data, onNext, onBack }) {
  const { headers } = data;
  const [target, setTarget] = useState(headers[0] || "");
  const [features, setFeatures] = useState(headers.slice(1));

  const available = useMemo(() => headers.filter((h) => h !== target), [headers, target]);

  const toggleFeature = (h) => {
    setFeatures((prev) => (prev.includes(h) ? prev.filter((x) => x !== h) : [...prev, h]));
  };

  const canContinue = target && features.length > 0;

  return (
    <section className="w-full">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-fuchsia-600/20 border border-fuchsia-500/30 flex items-center justify-center">
              <Settings2 className="h-5 w-5 text-fuchsia-400" />
            </div>
            <div>
              <h2 className="text-white text-xl font-semibold">Configure analysis</h2>
              <p className="text-neutral-400 text-sm">Choose a target to predict and the features to use.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-neutral-300 mb-2">Target variable</label>
              <div className="relative">
                <Target className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <select
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full appearance-none rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 pl-10 pr-10 py-2"
                >
                  {headers.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-neutral-300 mb-2">Features</label>
              <div className="flex flex-wrap gap-2">
                {available.map((h) => (
                  <button
                    key={h}
                    onClick={() => toggleFeature(h)}
                    className={`px-3 py-1.5 rounded-lg border text-sm transition ${
                      features.includes(h)
                        ? "bg-fuchsia-600/20 border-fuchsia-500/40 text-fuchsia-300"
                        : "bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700"
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button onClick={onBack} className="px-4 py-2 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-200 hover:bg-neutral-800">
              Back
            </button>
            <button
              onClick={() => onNext({ target, features })}
              disabled={!canContinue}
              className="px-4 py-2 rounded-lg bg-fuchsia-600 text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-fuchsia-500 transition"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
