import { useState } from "react";
import { Upload, FileSpreadsheet } from "lucide-react";

export default function UploadStep({ onNext }) {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setFileName(f.name);
  };

  const handleContinue = () => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result;
      try {
        // naive CSV parse to array of objects (first line headers)
        const text = typeof content === "string" ? content : new TextDecoder().decode(content);
        const lines = text.split(/\r?\n/).filter(Boolean);
        const headers = lines[0].split(",").map((h) => h.trim());
        const rows = lines.slice(1).map((line) => {
          const values = line.split(",");
          const obj = {};
          headers.forEach((h, i) => (obj[h] = values[i] !== undefined ? values[i].trim() : ""));
          return obj;
        });
        onNext({ headers, rows, raw: text, fileName });
      } catch (e) {
        console.error(e);
        alert("Could not parse file. Please upload a valid CSV.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <section className="w-full">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-fuchsia-600/20 border border-fuchsia-500/30 flex items-center justify-center">
              <Upload className="h-5 w-5 text-fuchsia-400" />
            </div>
            <div>
              <h2 className="text-white text-xl font-semibold">Upload your data</h2>
              <p className="text-neutral-400 text-sm">CSV up to 10MB. First row should contain column names.</p>
            </div>
          </div>

          <label className="flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed border-neutral-800 bg-neutral-900/40 hover:border-fuchsia-500/40 transition cursor-pointer">
            <FileSpreadsheet className="h-8 w-8 text-neutral-400" />
            <span className="text-neutral-300">{fileName || "Choose a CSV file"}</span>
            <input type="file" accept=".csv" className="hidden" onChange={handleFile} />
          </label>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleContinue}
              disabled={!file}
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
