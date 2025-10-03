import HomeHero from '@/components/heroes/HomeHero';
import FeaturedRoutes from '@/components/lists/FeaturedRoutes';
import FeaturedRouteGroups from '@/components/lists/FeaturedRouteGroups';

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
