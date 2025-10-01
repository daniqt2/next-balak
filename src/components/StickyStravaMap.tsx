'use client';

import React, { useEffect, useRef } from 'react';

type StyleName = "standard" | "minimal";

interface StickyStravaMapProps {
  route: {
    title?: string | null;
    stravaLink?: string | null;
    garminLink?: string | null;
    stravaId?: string | null;
  };
  units?: "metric" | "imperial";
  styleName?: StyleName;
  mapHash?: string | null;
  height?: number | string;
}

/**
 * Sticky Strava Map Component
 * Displays route map and links in a sticky sidebar
 */
export default function StickyStravaMap({ 
  route, 
  units = "metric",
  styleName = "standard",
  mapHash = null,
  height = 400
}: StickyStravaMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const renderPlaceholder = () => {
    if (!containerRef.current || !route.stravaId) return;
    
    containerRef.current.innerHTML = ""; // reset
    const div = document.createElement("div");
    div.className = "strava-embed-placeholder";
    div.setAttribute("data-embed-type", "route");
    div.setAttribute("data-embed-id", String(route.stravaId));
    div.setAttribute("data-units", units);
    div.setAttribute("data-style", styleName);
    div.setAttribute("data-from-embed", "true");
    if (mapHash) div.setAttribute("data-map-hash", mapHash);
    containerRef.current.appendChild(div);
  };

  const ensureScript = (): Promise<void> => {
    return new Promise((resolve) => {
      if (document.getElementById("strava-embeds-js")) return resolve();
      const s = document.createElement("script");
      s.id = "strava-embeds-js";
      s.src = "https://strava-embeds.com/embed.js";
      s.defer = true;
      s.onload = () => resolve();
      document.head.appendChild(s);
    });
  };

  const mountEmbed = async () => {
    if (!route.stravaId) return;
    
    renderPlaceholder();
    await ensureScript();
    
    // Some builds auto-initialize on load; if Strava exposes a global re-render, try it:
    if ((window as any).renderStravaEmbeds) {
      (window as any).renderStravaEmbeds();
    }
  };

  useEffect(() => {
    mountEmbed();
  }, [route.stravaId, units, styleName, mapHash]);

  return (
    <div className="sticky-map-container">
      <div className="sticky-map-content">
        {/* Strava Embed */}
        {route.stravaId ? (
          <div 
            ref={containerRef}
            className="strava-embed-container"
            style={{
              height: typeof height === 'number' ? `${height}px` : String(height),
            }}
            aria-label="Strava route embed"
          />
        ) : (
          <div className="map-placeholder">
            <div className="map-placeholder-content">
              <div className="map-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <p className="map-placeholder-text">No Strava Map Available</p>
              <p className="map-placeholder-subtitle">Strava ID not found for this route</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
