import { useMemo, useState } from "react";
import Header from "./components/Header";
import Stepper from "./components/Stepper";
import UploadStep from "./components/UploadStep";
import FeatureSelect from "./components/FeatureSelect";
import Results from "./components/Results";

function App() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(null); // { headers, rows }
  const [config, setConfig] = useState(null); // { target, features }

  const canStart = useMemo(() => step === 1, [step]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-10 space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Multivariate Linear Regression for Business Insights
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Upload your dataset, choose a target, and instantly get a clean, modern analysis with interactive charts and key metrics. Charcoal primary with a magenta accent for a crisp, professional feel.
          </p>
        </div>

        <Stepper step={step} />

        {step === 1 && (
          <UploadStep
            onNext={(parsed) => {
              setData(parsed);
              setStep(2);
            }}
          />
        )}

        {step === 2 && data && (
          <FeatureSelect
            data={data}
            onBack={() => setStep(1)}
            onNext={(cfg) => {
              setConfig(cfg);
              setStep(3);
            }}
          />
        )}

        {step === 3 && data && config && (
          <Results data={data} config={config} onBack={() => setStep(2)} />
        )}

        {canStart && (
          <div className="mx-auto max-w-4xl rounded-2xl border border-fuchsia-500/20 bg-fuchsia-600/5 p-4 text-center">
            <p className="text-fuchsia-200 text-sm">
              Tip: You can customize with your own CSV. The first row should contain column names.
            </p>
          </div>
        )}
      </main>

      <footer className="py-10">
        <div className="mx-auto max-w-6xl px-4 text-center text-neutral-500 text-sm">
          Built with ❤️ for analysts and operators. Charcoal × Magenta theme.
        </div>
      </footer>
    </div>
  );
}

export default App;
