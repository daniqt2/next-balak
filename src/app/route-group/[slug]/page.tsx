import { routeGroupService } from '@/services/route-group-service';
import { notFound } from 'next/navigation';

interface RouteGroupDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function RouteGroupDetailPage({ params }: RouteGroupDetailPageProps) {
  try {
    const data = await routeGroupService.getRouteGroupBySlug(params.slug);
    const routeGroup = data.routeGroupCollection?.items?.[0];

    if (!routeGroup) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-charcoal-900">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white mb-8">
            {routeGroup.title || 'Route Group Detail'}
          </h1>
          
          {routeGroup.subtitle && (
            <p className="text-balak-300 text-xl mb-6">
              {routeGroup.subtitle}
            </p>
          )}

          {routeGroup.description && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
              <p className="text-charcoal-300 text-lg leading-relaxed">
                {routeGroup.description}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {routeGroup.locationLabel && (
              <div className="bg-charcoal-800 p-4 rounded-lg">
                <h3 className="text-balak-300 font-semibold mb-2">Location</h3>
                <p className="text-white text-xl">{routeGroup.locationLabel}</p>
              </div>
            )}
            
            {routeGroup.locationLength && (
              <div className="bg-charcoal-800 p-4 rounded-lg">
                <h3 className="text-balak-300 font-semibold mb-2">Total Length</h3>
                <p className="text-white text-xl">{routeGroup.locationLength} km</p>
              </div>
            )}
            
            {routeGroup.routesCollection?.total && (
              <div className="bg-charcoal-800 p-4 rounded-lg">
                <h3 className="text-balak-300 font-semibold mb-2">Routes</h3>
                <p className="text-white text-xl">{routeGroup.routesCollection.total} routes</p>
              </div>
            )}
          </div>

          {routeGroup.routesCollection?.items && routeGroup.routesCollection.items.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Routes in this Group</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {routeGroup.routesCollection.items.map((route, index) => (
                  <div key={route?.sys.id || index} className="bg-charcoal-800 p-4 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">{route?.title}</h3>
                    {route?.subTitle && (
                      <p className="text-balak-300 text-sm mb-2">{route.subTitle}</p>
                    )}
                    <div className="flex gap-4 text-sm text-charcoal-400">
                      {route?.length && <span>{route.length} km</span>}
                      {route?.elevation && <span>{route.elevation} m</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="text-charcoal-400 text-lg">
            More route group details and images will be added here...
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching route group:', error);
    notFound();
  }
}
