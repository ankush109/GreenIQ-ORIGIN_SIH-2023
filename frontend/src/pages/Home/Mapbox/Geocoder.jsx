import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const Geocoder = () => {
  const ctrl = new MapBoxGeocoder({
    accessToken: 'pk.eyJ1Ijoia2F1c2hhbi01NDA5IiwiYSI6ImNsamxsbnN6cTBwY2kzZnNkbGl4MzN3d28ifQ.Z5eT8YhsfauPp6lGLbYT8w',
    marker: false,
    collapsed: true,
  });
  useControl(() => ctrl);
  
  return null;
};

export default Geocoder;