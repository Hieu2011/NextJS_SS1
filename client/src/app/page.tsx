import CardList from "@/components/CardList";
import AppAreaChart from "@/components/chart/AppAreaChart";
import AppBarChar from "@/components/chart/AppBarChar";
import AppPieChart from "@/components/chart/AppPieChart";
import AppRadarChart from "@/components/chart/AppRadarChart";

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
      <div className="bg-primary-foreground rounded-lg p-4 lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppRadarChart />
      </div>
      <div className="bg-primary-foreground rounded-lg p-4">
        <CardList title="Popular Content" />
      </div>
      <div className="bg-primary-foreground rounded-lg p-4">
        <CardList title="Latest Transactions" />
      </div>
    </div>
  );
}
