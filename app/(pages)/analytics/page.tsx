import DonutChart from "@/components/analytics/DonutChart";
import MostViewedProduct from "@/components/analytics/MostViewedProduct";
import RecentProducts from "@/components/analytics/RecentProducts";
import TopSellingProduct from "@/components/analytics/TopSellingProduct";
import { TbBrandGoogleAnalytics } from "react-icons/tb";

const page = () => {
  return (
    <div className="container flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <TbBrandGoogleAnalytics size={18} color="gray" />
        <span className="font-medium text-lg">Analytics</span>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white">
          <h2 className="font-medium text-md mt-5 ml-5">Assets</h2>
          <div className="flex items-center justify-center h-full">
            <DonutChart />
          </div>
        </div>
        <div className="bg-white">
          <TopSellingProduct />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white">
          <div className="flex items-center justify-center h-full">
            <MostViewedProduct />
          </div>
        </div>
        <div className="bg-white">
          <TopSellingProduct />
        </div>
      </div>
      <div className="bg-white">
        <RecentProducts />
      </div>
    </div>
  );
};
export default page;
