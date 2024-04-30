import Navbar from "../../../components/navbar";
import { Sidebar } from "../../../components/sidebar";
import { checkSubscription } from "../../../lib/subscription";
import { getApiLimitCount } from "../../../lib/api-limit";

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return ( 
    <div className="h-full relative">
      
      <main>
        <Navbar />
        {children}
      </main>
    </div>
   );
}
 
export default DashboardLayout;
