import HomeHero from '@/components/HomeHero';
import FeaturedRoutes from '@/components/FeaturedRoutes';
import FeaturedRouteGroups from '@/components/FeaturedRouteGroups';

export default function Home() {
  return (
    <div className="min-h-screen bg-charcoal-900">
      {/* Hero Section */}
      <HomeHero />
      
      <div className="container mx-auto px-4 py-8">
        {/* Featured Routes */}
        <FeaturedRoutes />
        
        {/* Featured Route Groups */}
        <FeaturedRouteGroups />
        
      </div>
    </div>
  );
}
