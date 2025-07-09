import AppAreaChart from "@/components/AppAreaChart";
import AppBarChar from "@/components/AppBarChar";
import AppPieChart from "@/components/AppPieChart";

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
      <div className="bg-primary-foreground rounded-lg p-4 lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppBarChar />
      </div>
      <div className="bg-primary-foreground rounded-lg p-4 lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppAreaChart />
      </div>
      <div className="bg-primary-foreground rounded-lg p-4 lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppPieChart />
      </div>
      <div className="bg-primary-foreground rounded-lg p-4">2</div>
      <div className="bg-primary-foreground rounded-lg p-4">3</div>
    </div>
  );
}
