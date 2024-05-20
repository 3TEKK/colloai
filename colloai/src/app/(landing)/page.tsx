import { LandingNavbar } from "../../../components/landing-navbar";
import { LandingHero } from "../../../components/landing-hero";
import { LandingContent } from "../../../components/landing-content";
import { Footer } from "../../../components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import PricingProps from "../../../components/PricingProps";

const LandingPage = () => {
  return (
      <div className="h-full ">
        <LandingNavbar />
        <LandingHero />
        <LandingContent />
        <PricingProps />
        <Footer />
      </div>
  );
}

export default LandingPage;
