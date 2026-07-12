import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Phone, Globe, Clock, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { STATE_COORDS, CATEGORY_LABELS } from '../data/constants';

/*
 * MAPBOX TOKEN FLOW:
 * VITE_MAPBOX_TOKEN lives in the root .env file (never committed).
 * Vite reads it via envDir: '..' in vite.config.js and exposes it as import.meta.env.VITE_MAPBOX_TOKEN.
 * This component reads that token and passes it to mapboxgl.accessToken before initializing the map.
 */

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || '';

const FILTER_OPTIONS = [
  { id: 'all', key: 'all' },
  { id: 'food', key: 'food' },
  { id: 'healthcare', key: 'healthcare' },
  { id: 'housing', key: 'housing' },
  { id: 'legal', key: 'legal' },
  { id: 'employment', key: 'employment' },
];

function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 3959;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function buildPopupHTML(resource, lang) {
  const category = CATEGORY_LABELS[resource.category]?.[lang] || resource.type;
  return `
    <div class="resource-popup">
      <span class="resource-popup__badge">${category}</span>
      <h3 class="resource-popup__title">${resource.name}</h3>
      <p class="resource-popup__type">${resource.type}</p>
      <p class="resource-popup__address">${resource.address}</p>
      ${resource.phone ? `<p class="resource-popup__meta">${resource.phone}</p>` : ''}
      ${resource.hours ? `<p class="resource-popup__meta">${resource.hours}</p>` : ''}
      ${resource.website ? `<a href="${resource.website}" target="_blank" rel="noopener noreferrer" class="resource-popup__link">Visit website</a>` : ''}
    </div>
  `;
}

export default function ResourceMap({ resources = [], state = 'PA' }) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language === 'es' ? 'es' : 'en';
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const popupRef = useRef(null);

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const stateCenter = STATE_COORDS[state] || STATE_COORDS.PA;

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setUserLocation(null),
      { timeout: 8000 }
    );
  }, []);

  const filteredResources = useMemo(() => {
    let list = activeFilter === 'all'
      ? resources
      : resources.filter(r => r.category === activeFilter);

    const origin = userLocation || stateCenter;

    return list
      .map(r => ({
        ...r,
        distance: haversineDistance(origin.lat, origin.lng, r.lat, r.lng),
      }))
      .sort((a, b) => a.distance - b.distance);
  }, [resources, activeFilter, userLocation, stateCenter]);

  const geojson = useMemo(() => ({
    type: 'FeatureCollection',
    features: filteredResources.map(r => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [r.lng, r.lat] },
      properties: {
        id: r.id,
        name: r.name,
        type: r.type,
        category: r.category,
        address: r.address,
        phone: r.phone || '',
        hours: r.hours || '',
        website: r.website || '',
      },
    })),
  }), [filteredResources]);

  const focusResource = useCallback((resource) => {
    setSelectedId(resource.id);
    const map = mapRef.current;
    if (!map) return;

    map.flyTo({ center: [resource.lng, resource.lat], zoom: 14, duration: 800 });

    if (popupRef.current) popupRef.current.remove();
    popupRef.current = new mapboxgl.Popup({ offset: 20, closeButton: true, maxWidth: '280px' })
      .setLngLat([resource.lng, resource.lat])
      .setHTML(buildPopupHTML(resource, lang))
      .addTo(map);
  }, [lang]);

  useEffect(() => {
    if (!mapContainer.current || !import.meta.env.VITE_MAPBOX_TOKEN) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [stateCenter.lng, stateCenter.lat],
      zoom: 10,
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');
    popupRef.current = new mapboxgl.Popup({ closeButton: true, maxWidth: '280px' });

    map.on('load', () => {
      map.addSource('resources', {
        type: 'geojson',
        data: geojson,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 55,
      });

      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'resources',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': ['step', ['get', 'point_count'], '#00FF87', 5, '#7C3AED', 15, '#5B21B6'],
          'circle-radius': ['step', ['get', 'point_count'], 18, 5, 24, 15, 30],
          'circle-opacity': 0.85,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#0A0F1E',
        },
      });

      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'resources',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-size': 13,
          'text-font': ['DIN Pro Medium', 'Arial Unicode MS Bold'],
        },
        paint: { 'text-color': '#0A0F1E' },
      });

      map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'resources',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#00FF87',
          'circle-radius': 8,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
        },
      });

      map.on('click', 'clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
        const clusterId = features[0].properties.cluster_id;
        map.getSource('resources').getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;
          map.easeTo({ center: features[0].geometry.coordinates, zoom });
        });
      });

      map.on('click', 'unclustered-point', (e) => {
        const props = e.features[0].properties;
        const coords = e.features[0].geometry.coordinates.slice();
        const resource = filteredResources.find(r => r.id === props.id);
        if (resource) {
          setSelectedId(resource.id);
          popupRef.current
            .setLngLat(coords)
            .setHTML(buildPopupHTML(resource, lang))
            .addTo(map);
        }
      });

      map.on('mouseenter', 'clusters', () => { map.getCanvas().style.cursor = 'pointer'; });
      map.on('mouseleave', 'clusters', () => { map.getCanvas().style.cursor = ''; });
      map.on('mouseenter', 'unclustered-point', () => { map.getCanvas().style.cursor = 'pointer'; });
      map.on('mouseleave', 'unclustered-point', () => { map.getCanvas().style.cursor = ''; });
    });

    mapRef.current = map;

    return () => {
      popupRef.current?.remove();
      map.remove();
      mapRef.current = null;
    };
  }, [stateCenter.lng, stateCenter.lat]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;
    const source = map.getSource('resources');
    if (source) source.setData(geojson);

    if (filteredResources.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();
      filteredResources.forEach(r => bounds.extend([r.lng, r.lat]));
      map.fitBounds(bounds, { padding: 50, maxZoom: 13, duration: 600 });
    }
  }, [geojson, filteredResources]);

  if (!import.meta.env.VITE_MAPBOX_TOKEN) {
    return (
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <p className="text-white/50 text-sm">{t('map.noToken')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-h-[20rem] overflow-y-auto">
          {filteredResources.map(r => (
            <ResourceListCard
              key={r.id}
              resource={r}
              lang={lang}
              selected={selectedId === r.id}
              onClick={() => setSelectedId(r.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-4 border-b border-white/10 flex flex-wrap gap-2">
        {FILTER_OPTIONS.map(f => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActiveFilter(f.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 active:scale-95 ${
              activeFilter === f.id
                ? 'bg-accent text-navy shadow-[0_0_12px_rgba(0,255,135,0.3)]'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            {f.id === 'all' ? t('results.all') : CATEGORY_LABELS[f.key]?.[lang] || f.key}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row h-[28rem] md:h-[32rem] lg:h-[28rem]">
        <div className="lg:w-[320px] xl:w-[360px] border-b lg:border-b-0 lg:border-r border-white/10 overflow-y-auto max-h-48 lg:max-h-none flex-shrink-0 bg-navy/30">
          {filteredResources.length === 0 ? (
            <p className="p-6 text-white/40 text-sm text-center">{t('map.noResources')}</p>
          ) : (
            filteredResources.map(r => (
              <ResourceListCard
                key={r.id}
                resource={r}
                lang={lang}
                selected={selectedId === r.id}
                onClick={() => focusResource(r)}
              />
            ))
          )}
        </div>

        <div className="flex-1 min-h-[16rem] lg:min-h-0 relative bg-charcoal/50">
          <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
        </div>
      </div>
    </div>
  );
}

function ResourceListCard({ resource, lang, selected, onClick }) {
  const category = CATEGORY_LABELS[resource.category]?.[lang] || resource.type;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left p-4 border-b border-white/10 transition-all duration-300 hover:bg-accent/5 ${
        selected ? 'bg-accent/10 border-l-4 border-l-accent' : 'border-l-4 border-l-transparent'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="font-semibold text-sm text-white leading-tight">{resource.name}</p>
        {resource.distance != null && (
          <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full whitespace-nowrap">
            {resource.distance.toFixed(1)} mi
          </span>
        )}
      </div>
      <p className="text-xs text-accent mb-2 font-medium">{category}</p>
      <p className="text-xs text-white/60 flex items-start gap-2 leading-relaxed">
        <MapPin size={13} className="mt-0.5 flex-shrink-0 text-accent/70" />
        {resource.address}
      </p>
    </button>
  );
}
