import { getHomePageData } from "@/data/loaders";
import { HomeHeroSection } from "@/components/sections/HomeHeroSection";
import { FeatureSection } from "@/components/sections/FeatureSection";

function blockRenderer(block: any) {
  switch (block.__component) {
    case "layout.hero-section":
      return <HomeHeroSection key={block.id} data={block} />;
    case "layout.features-section":
      return <FeatureSection key={block.id} data={block} />;
    default:
      return null;
  }
}

export default async function Home() {
  const strapiData = await getHomePageData();

  const { blocks } = strapiData.data;
  if (!blocks) return <div> No Blocks Found </div>;
  return <main>{blocks.map((blocks: any) => blockRenderer(blocks))}</main>;
}
