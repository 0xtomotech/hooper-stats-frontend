import { AreaChartComponent } from "@/components/complex-area-chart";
import { ComplexDataFetch } from "@/components/complex-data-fetch";
import { SimpleDataFetch } from "@/components/simple-data-fetch";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-7xl items-center justify-between font-mono text-sm">
        <div className="pb-16">
          <h1 className="pb-2 text-2xl font-semibold leading-none tracking-tight">
            Hooper Stats
          </h1>
          <p className="text-sm">A proof of concept experiment...</p>
        </div>
        <div className="w-full pb-16">
          <p className="pb-2 text-sm">Simple data fetch test goes here...</p>
          <SimpleDataFetch />
        </div>
        <div className="w-full pb-16">
          <p className="pb-2 text-sm">
            A more complex data fetch test goes here...
          </p>

          <ComplexDataFetch />
        </div>
        <div className="w-full pb-16">
          <p className="pb-2 text-sm">ShadCN chart goes here...</p>

          <AreaChartComponent />
        </div>
      </div>
    </main>
  );
}
