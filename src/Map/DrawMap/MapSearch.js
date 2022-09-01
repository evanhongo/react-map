import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import { usePrevious, useWatch } from "@evanhongo/react-custom-hook";
import { Loader } from "@evanhongo/react-custom-component";

import "./MapSearch.css";

const ResultItem = memo(
  ({ osm, handleClickItem }) => (
    <div className="resultItem" onClick={handleClickItem}>
      {`${osm.display_name}`}
    </div>
  ),
  (preProps, nextProps) => preProps.osm.place_id === nextProps.osm.place_id
);

export default function MapSearch({ map, style }) {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [moreResult, setMoreResult] = useState([]);
  const previousMoreResult = usePrevious(moreResult);

  const getOSMObjects = async (keyword = "", exclude_place_ids = "") => {
    if (keyword.length === 0) return [];

    setIsLoading(true);
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search.php?format=json&polygon=1&countrycodes=TW,US&q=${keyword}&exclude_place_ids=${exclude_place_ids}`
    );
    setIsLoading(false);
    const result = response.data ?? [];
    if (!result.length) return [];

    //console.log(result);
    return result.map((osm) => ({
      place_id: osm.place_id,
      display_name: osm.display_name,
      lat: osm.lat,
      lon: osm.lon,
    }));
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      const result = await getOSMObjects(keyword);
      if (result.length)
        setResult([
          ...result,
          { place_id: "Search more", display_name: "Search more..." },
        ]);
    }
  };

  useEffect(() => {
    setResult([]);
  }, [keyword]);

  useWatch([moreResult], () => {
    if (moreResult.length) {
      const moreIds = moreResult.map((osm) => osm.place_id);
      const previousMoreIds = previousMoreResult?.map((osm) => osm.place_id);

      let flag = true;
      for (let moreId of moreIds)
        if (!previousMoreIds.includes(moreId)) {
          flag = false;
          break;
        }

      if (flag) {
        setResult((result) => [
          ...result.slice(0, result.length - 1),
          {
            place_id: "No more",
            display_name: "No more...",
          },
        ]);
      } else {
        setResult((result) => [
          ...result.slice(0, result.length - 1),
          ...moreResult,
          {
            place_id: "Search more",
            display_name: "Search more...",
          },
        ]);
      }
    }
  });

  return (
    <div
      style={{
        position: "relative",
        marginTop: "0px",
        zIndex: "9999",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Please press 'enter' to search location"
          style={{
            width: "500px",
            height: "50px",
            fontSize: "20px",
            border: "1px solid black",
            ...style,
          }}
          value={keyword}
          onChange={handleKeywordChange}
          onKeyPress={handleKeyPress}
        />
        {isLoading && (
          <Loader
            type="rolling"
            style={{ marginLeft: "-60px", width: "50px", height: "50px" }}
          />
        )}
      </div>
      <div className="resultGroup">
        {result.map((osm) => (
          <ResultItem
            key={osm.place_id}
            osm={osm}
            handleClickItem={async () => {
              if (osm.place_id === "No more") {
                setResult([]);
                return;
              }
              if (osm.place_id !== "Search more") {
                setResult([]);
                setMoreResult([]);            
                map.target.flyTo({ lat: osm.lat, lng: osm.lon }, 18);
              } else {
                const tmpResult = result.slice(0, result.length - 1);
                const excludePlaceIds = tmpResult
                  .map((osm) => osm.place_id)
                  .join(",");
                const tmpResult2 = await getOSMObjects(
                  keyword,
                  excludePlaceIds
                );
                setMoreResult(tmpResult2);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
