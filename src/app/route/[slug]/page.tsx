import { routeService } from '@/services/route-service';
import { notFound } from 'next/navigation';
import RouteMetric, { RouteMetricIcons } from '@/components/RouteMetric';
import StickyStravaMap from '@/components/StickyStravaMap';
import RouteHero from '@/components/RouteHero';
import '@/styles/stickyMap.css';

interface RouteDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function RouteDetailPage({ params }: RouteDetailPageProps) {
  try {
    const data = await routeService.getRouteBySlug(params.slug);
    const route = data.routeCollection?.items?.[0];

    if (!route) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-charcoal-900">
        {/* Hero Section */}
        <RouteHero route={route} />
        
        <div className="container mx-auto px-4 py-8">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">

              {route.description && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
                  <p className="text-charcoal-300 text-lg leading-relaxed">
                    {route.description}
                  </p>
                </div>
              )}

              {/* Modern Stats Display */}
              <div className="mb-12">
                <div className="flex flex-wrap gap-8 justify-center">
                  {route.length && (
                    <RouteMetric
                      value={route.length}
                      unit="km"
                      icon={RouteMetricIcons.ruler}
                    />
                  )}
                  
                  {route.elevation && (
                    <RouteMetric
                      value={route.elevation}
                      unit="m"
                      icon={RouteMetricIcons.elevation}
                    />
                  )}
                  
                  {route.time && (
                    <RouteMetric
                      value={route.time}
                      unit="duration"
                      icon={RouteMetricIcons.clock}
                    />
                  )}
                </div>
              </div>

              {(route.startLocationName || route.endLocationName) && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Route Info</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {route.startLocationName && (
                      <div className="bg-charcoal-800 p-4 rounded-lg">
                        <h3 className="text-balak-300 font-semibold mb-2">Start Location</h3>
                        <p className="text-white">{route.startLocationName}</p>
                      </div>
                    )}
                    {route.endLocationName && (
                      <div className="bg-charcoal-800 p-4 rounded-lg">
                        <h3 className="text-balak-300 font-semibold mb-2">End Location</h3>
                        <p className="text-white">{route.endLocationName}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <p className="text-charcoal-400 text-lg">
                More route details and images will be added here...
              </p>
            </div>

            {/* Sticky Sidebar Column */}
            <div className="lg:col-span-1">
              <StickyStravaMap route={route} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching route:', error);
    notFound();
  }
}
