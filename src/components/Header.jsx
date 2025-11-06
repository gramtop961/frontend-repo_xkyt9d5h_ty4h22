import { Rocket } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-20 backdrop-blur bg-neutral-950/70 border-b border-neutral-800/80">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-fuchsia-600/20 border border-fuchsia-500/30 flex items-center justify-center">
            <Rocket className="h-5 w-5 text-fuchsia-400" />
          </div>
          <div>
            <p className="text-white font-semibold leading-tight">RegressIQ</p>
            <p className="text-xs text-neutral-400 -mt-0.5">Multivariate Regression Studio</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-xs text-neutral-400">
          <span className="px-2 py-1 rounded-md bg-neutral-900 border border-neutral-800">Modern SaaS</span>
          <span className="px-2 py-1 rounded-md bg-neutral-900 border border-neutral-800">Charcoal + Magenta</span>
        </div>
      </div>
    </header>
  );
}
