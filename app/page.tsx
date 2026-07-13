import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { CoreServices } from "@/components/home/CoreServices";
import { Commitments } from "@/components/home/Commitments";
import { WhyChoose } from "@/components/home/WhyChoose";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { BuildToOwn } from "@/components/home/BuildToOwn";
import { PlotsPreview } from "@/components/home/PlotsPreview";
import { InvestmentConsultancy } from "@/components/home/InvestmentConsultancy";
import { MapPreview } from "@/components/home/MapPreview";
import { ListPropertyCta } from "@/components/home/ListPropertyCta";
import { Testimonials } from "@/components/home/Testimonials";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <CoreServices />
      <Commitments />
      <FeaturedProperties />
      <WhyChoose />
      <BuildToOwn />
      <PlotsPreview />
      <InvestmentConsultancy />
      <MapPreview />
      <ListPropertyCta />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
