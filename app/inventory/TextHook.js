import React, { useEffect, useState } from "react";

export default useTextHook = (url) => {
  const [apiData, setApiData] = useState([]);

  const getData = async (url) => {
    try {
      let apiCall = await fetch(url);
      let res = await apiCall.json();
      setApiData(res);
      console.log("res===", res);
    } catch (error) {
      console.log("error===", error);
    }
  };

  useEffect(() => {
    getData(url);
  }, []);

  return { apiData };
};
