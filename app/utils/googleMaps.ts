import isUndefined from 'lodash/isUndefined';
import { Location } from 'containers/MapDetailPage/types';

const polylineConfig = {
  strokeColor: '#cbae2f',
};
let gmarkers: any = [];
let distanceMap: string = '0m';

/// TEST

// END test

/**
 * Polyline getData
 * @param userLocation
 * @param toLocation
 * @param map
 * @param maps
 * @param polyLineCallBack
 */
function apiGetDirection(
  userLocation: Location,
  toLocation: Location,
  map: any,
  maps: any,
  polyLineCallBack: (polyline: any) => void,
) {
  if (maps && map) {
    const directionsService = new maps.DirectionsService();
    const directionsDisplay = new maps.DirectionsRenderer();
    directionsDisplay.setMap(null);
    const origin = new maps.LatLng(
      userLocation.latitude,
      userLocation.longitude,
    );
    const destination = new maps.LatLng(
      toLocation.latitude,
      toLocation.longitude,
    );
    // var about: any = []
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: 'WALKING',
      },
      (response, status) => {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          const routePolyline = new maps.Polyline({
            strokeColor: polylineConfig.strokeColor,
            path: response.routes[0].overview_path,
          });

          // GET distance meters
          let lengthInMeters = maps.geometry.spherical.computeLength(routePolyline.getPath());
          distanceMap = convertDistance(lengthInMeters);
        
          // GET center point in map
          maps.Polyline.prototype.getBounds = function() {
            let bounds = new maps.LatLngBounds();
            this.getPath().forEach((e) => {
              bounds.extend(e);
            });
            return bounds;
          };
          // center lat long
          // const tempCenter = maps.geometry.spherical.interpolate(
          //   new maps.LatLng(userLocation.latitude,userLocation.longitude),
          //   new maps.LatLng(toLocation.latitude,toLocation.longitude),
          //   0.6)
          let infowindow = new maps.InfoWindow({
            content:  `\
              <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"   \
              version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 478.405 478.405" style="enable-background:new 0 0 478.405 478.405;" \
              xml:space="preserve" width="512px" height="512px"> \
              <g><g><g> \
              <path d="M423.792,206.222c-0.411-0.137-0.828-0.258-1.248-0.363l-64.853-16.23L304.05,149.47    \
              c35.421-31.087,38.934-85.003,7.847-120.424c-31.087-35.421-85.003-38.934-120.424-7.847   \ 
              c-33.71,29.585-38.763,80.217-11.566,115.881h-0.444c-4.526,0.001-8.866,1.8-12.066,5L47.93,261.547    \
              c-6.663,6.665-6.663,17.468,0,24.132l34.133,34.133c6.149,6.152,15.941,6.696,22.733,1.263l57.6-46.08v30.72l-14.95,59.836 \
              l-45.722,30.396c-7.842,5.23-9.959,15.826-4.73,23.668c0.001,0.001,0.002,0.002,0.002,0.004l34.133,51.2    \
              c5.069,7.568,15.187,9.821,22.989,5.12l85.333-51.2c3.491-2.096,6.119-5.37,7.407-9.233l6.025-18.091l48.913,73.387    \
              c4.773,7.161,14.13,9.648,21.828,5.803l68.267-34.133c8.434-4.208,11.86-14.457,7.652-22.891    \
              c-0.002-0.004-0.004-0.008-0.006-0.013l-51.2-102.4c-0.321-0.635-0.68-1.251-1.075-1.843l-25.071-37.547l76.322,12.715    \
              c0.931,0.146,1.874,0.208,2.816,0.188c7.349,0.002,13.874-4.701,16.196-11.674l17.067-51.2    \
              C437.57,218.863,432.735,209.199,423.792,206.222z M247.73,34.68c28.277,0,51.2,22.923,51.2,51.2s-22.923,51.2-51.2,51.2    \
              s-51.2-22.923-51.2-51.2S219.453,34.68,247.73,34.68z M216.412,398.763L150.45,438.34l-15.633-23.467l37.001-24.661   \
              c3.531-2.358,6.057-5.949,7.083-10.069l10.837-43.315l37.854,28.382L216.412,398.763z M361.308,419.567l-39.526,19.763 \
              l-59.904-89.873c-0.556-0.696-1.173-1.341-1.843-1.929c-0.519-0.617-1.09-1.188-1.707-1.707c-\
              0.188-0.154-0.307-0.375-0.495-0.529 \
              l-61.303-46.08V239.48c0.004-9.426-7.635-17.07-17.06-17.073c-3.88-0.001-7.644,1.319-10.673,3.744L95.41,284.877l-11.281-11.264 \
              l102.4-102.4h80.538l14.967,104.823c0.362,2.521,1.283,4.93,2.697,7.049l33.536,50.261L361.308,419.567z M389.69,254.362 \
              l-78.131-13.005l-6.98-48.845L339.89,219c1.818,1.363,3.889,2.349,6.093,2.901l50.398,12.595L389.69,254.362z" \
              data-original="#000000" \
              class="active-path" data-old_color="#000000" fill="#F39337"/> \
	            </g></g></g> </svg> <span style="color: #F39337">About ${distanceMap}</span>`
          });
          const about = new maps.Marker({
            position: routePolyline.getBounds().getCenter(),
            map: map,
            icon: {
              anchor: new maps.Point(16, 16),
              url: ''
            },
          });
          
          infowindow.open(map, about);
          gmarkers.push(about);
          polyLineCallBack(routePolyline);
        } else {
          console.warn('Directions request failed due to ' + status);
        }
      },
    );
  }
}

function drawDirection(polyLine: any, map: any) {
  if (polyLine && map) {
    polyLine.setMap(map);
  }
}

function clearDirection(polyLine: any) {
  if (polyLine) {
    polyLine.setMap(null);
    removeMarkers();
  }
}
// convert distance 
function convertDistance(lengthInMeters: any) {
  let lengthInKms = lengthInMeters ? lengthInMeters / 1000 : 0;
  let tempDistance = lengthInKms > 1 ? (
    lengthInKms === 0 ? '0m' : parseFloat(lengthInKms + "").toFixed(2) + 'km'
  ) : lengthInKms === 0 ? '0m' : parseFloat(lengthInMeters + "").toFixed(2) + 'm';
  return tempDistance;
}
// remove maker
function removeMarkers(){
  while(gmarkers.length) {
    let oldMarker=gmarkers.pop();
    oldMarker.setMap(null);
  }
  gmarkers = [];
}

function getLocation(
  callbackDone: (latitude: number, longitude: number) => void,
) {
  if (!isUndefined(navigator) && navigator.geolocation) {
    const options = {
      enableHighAccuracy: false,
      timeout: 60000,
      maximumAge: 0,
    };
    const id = navigator.geolocation.watchPosition(
      pos => {
        const { longitude, latitude } = pos.coords;
        callbackDone(latitude, longitude);
        navigator.geolocation.clearWatch(id);
      },
      err => {
        console.warn('ERROR(' + err.code + '): ' + err.message);
        return;
      },
      options,
    );
  }

  return;
}

export { getLocation, apiGetDirection, drawDirection, clearDirection, removeMarkers };
