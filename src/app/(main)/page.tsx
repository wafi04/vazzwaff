import MainLayout from "@/components/layouts/mainlayout";
import { BannerHomeDesign } from "@/features/components/BannerHome";
import { PopularSection } from "./_components/popular";
import { ProductGrid } from "./_components/productsGrid";

export default function HomePage() {
  return (
    <MainLayout className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-10">
      <BannerHomeDesign />
      <PopularSection />
      <ProductGrid />
    </MainLayout>
  );
}