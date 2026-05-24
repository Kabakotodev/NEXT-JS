import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import VisaSearchForm from "@/components/search/VisaSearchForm";
import ServicesSection from "@/components/home/ServicesSection";
import CTASection from "@/components/home/CTASection";
import RecentArticles from "@/components/home/RecentArticles";
import NewsTimeline from "@/components/home/NewsTimeline";

// import visaRoutes from "./routes/visa.routes";


const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">
        <HeroSection />
        <VisaSearchForm />
        <ServicesSection />
        <CTASection />

        <RecentArticles />
        <NewsTimeline />

      </main>
      <Footer />
    </div>
  );
};

export default Index;
