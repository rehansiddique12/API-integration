import LineCharts from "@/components/dashboard/line-chart";
import MaxWidthWrapper from "@/components/max-width-wrapper";

const Dashboard = () => {
  return (
    <div>
      <MaxWidthWrapper>
       <div className="grid grid-cols-2 gap-5">
       <LineCharts />
       <LineCharts />
       </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Dashboard;
