import HomeHero from '@/components/HomeHero';
import FeaturedRoutes from '@/components/FeaturedRoutes';
import FeaturedRouteGroups from '@/components/FeaturedRouteGroups';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <HomeHero />
      
      <div className="container mx-auto px-4 py-8">
        <FeaturedRoutes />
        <FeaturedRouteGroups />
      </div>
    </div>
  );
}
