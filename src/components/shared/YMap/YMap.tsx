"use client";
import React, { FC, useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "@iminside/react-yandex-maps";

interface Props {}
const apikey = "220d8f99-d207-4451-922d-ac3513b33755";
const YMap: FC<Props> = ({}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate map loading (replace with actual map initialization/API call)
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false when map is ready
    }, 1000); // Adjust the timeout as needed

    return () => clearTimeout(timer); // Clear timeout on unmount
  }, []);

  if (loading) {
    return <div>...loading</div>; // Or a more elaborate loading spinner
  }
  const defaultState = {
    center: [41.3775, 64.5853], // Center of Uzbekistan
    zoom: 5,
  };
  return (
    <div className="h-42.5 w-full rounded-[20px] overflow-hidden">
      <YMaps query={{ apikey }}>
        <Map defaultState={defaultState} className="w-full h-full">
          <Placemark
            geometry={[41.3775, 64.5853]}
            options={{
              iconLayout: "default#image", // Indicate that we're using an image
              iconImageHref: "/images/pin.png", // Path to your SVG in the public folder
              iconImageSize: [64, 70], // Set the desired size for your SVG marker
              iconImageOffset: [-32, -64], // Adjust offset: [-width/2, -height] for bottom center
            }}
          />
        </Map>
      </YMaps>
    </div>
  );
};

export default YMap;
