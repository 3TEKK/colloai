import { LandingNavbar } from "../../../components/landing-navbar";
import { LandingHero } from "../../../components/landing-hero";
import { LandingContent } from "../../../components/landing-content";
import { Footer } from "../../../components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import PricingProps from "../../../components/PricingProps";

const LandingPage = () => {
  return (
    <ClerkProvider>
      <div className="h-full ">
        <LandingNavbar />
        <LandingHero />
        <LandingContent />
        <PricingProps />
        <Footer />
      </div>
    </ClerkProvider>
  );
}

export default LandingPage;
