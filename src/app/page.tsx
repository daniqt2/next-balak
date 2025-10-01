import { RouteList } from '@/components/RouteList';
import { RouteGroupResults } from '@/components/RouteGroupResults';
import { RouteCarousel } from '@/components/RouteCarousel';
import { RouteCardCarousel } from '@/components/RouteCardCarousel';
import { RouteImageCardCarousel } from '@/components/RouteImageCardCarousel';
import { RouteGrid } from '@/components/RouteGrid';
import { RouteGroupGrid } from '@/components/RouteGroupGrid';

export default function Home() {
  return (
    <div className="min-h-screen bg-charcoal-900">
      <div className="container mx-auto px-4 py-8">
        <RouteImageCardCarousel />
        <div className="mt-16">
          <RouteCarousel />
        </div>
        <div className="mt-16">
          <RouteCardCarousel />
        </div>
        <div className="mt-16">
          <RouteGroupGrid />
        </div>
        <div className="mt-16">
          <RouteGrid />
        </div>
        <div className="mt-16">
          <RouteGroupResults />
        </div>
        <div className="mt-16">
          <RouteList />
        </div>
      </div>
    </div>
  );
}
