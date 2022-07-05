import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';
import style from './mapchart.module.scss';

const geoUrl = 'https://raw.githubusercontent.com/deldersveld/topojson/master/continents/africa.json';
const onWheel = (e: any) => (e.deltaY > 0 ? setZoom(prev => prev - 0.3) : setZoom(prev => prev + 0.3));

export const MapChart = () => (
  <div>
    <ComposableMap className={style.svg}>
      <ZoomableGroup center={[0, 0]} zoom={9}>
        <Geographies geography="/features.json">
          {({ geographies }) => {
            return geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />);
          }}
        </Geographies>
        <Marker coordinates={[0, 0]}>
          <circle r={3} fill="#FF5533" />
        </Marker>
        <Marker coordinates={[0, 0]}>
          <circle r={2} fill="#FF5533" />
        </Marker>
      </ZoomableGroup>
    </ComposableMap>
  </div>
);
function setZoom(arg0: (prev: any) => number) {
  throw new Error('Function not implemented.');
}
