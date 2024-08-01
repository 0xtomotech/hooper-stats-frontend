import { AreaChartComponent } from "@/components/area-chart";
import { SimpleDataFetch } from "@/components/simple-data-fetch";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-7xl items-center justify-between font-mono text-sm">
        <div className="pb-12">
          <h1 className="pb-2 text-2xl font-semibold leading-none tracking-tight">
            Hooper Stats
          </h1>
          <p className="text-sm">A proof of concept experiment...</p>
        </div>
        <p className="pb-2 text-sm">Simple data fetch test goes here...</p>
        <div className="w-full pb-12">
          <SimpleDataFetch />
        </div>
        <p className="pb-2 text-sm">ShadCN chart goes here</p>
        <div className="w-full">
          <AreaChartComponent />
        </div>
      </div>
    </main>
  );
}
