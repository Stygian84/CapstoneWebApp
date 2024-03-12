import axios from "axios";
import React, { useEffect } from "react";
import $ from "jquery";

function addVisitedPage(page) {
  // Check if localStorage is supported
  if (typeof localStorage === "undefined") {
    console.error("localStorage is not supported");
    return;
  }
  const visitedPages = JSON.parse(localStorage.getItem("visitedPages")) || [];
  const filteredPages = visitedPages.filter((visitedPage) => visitedPage !== page);
  filteredPages.unshift(page);

  if (filteredPages.length > 4) {
    filteredPages.splice(4);
  }

  localStorage.setItem("visitedPages", JSON.stringify(filteredPages));
}

const fetchDataFromLinks = async (suffix) => {
  const links = [
    process.env.REACT_APP_RENDER_URL,
    process.env.REACT_APP_AWS_URL,
    // Add more links here
  ];

  let jsonData = null;

  for (let i = 1; i < links.length; i++) {
    try {
      const response = await axios.get(links[i] + suffix, {
        timeout: 5000, // Timeout in milliseconds (e.g., 5000 for 5 seconds)
      });
      jsonData = response.data;
      console.log("Successfully receive data from " + links[i] + suffix);
      return jsonData; // Return jsonData if successful
    } catch (error) {
      console.error("Error fetching URL:", links[i] + suffix);
      console.error(error);
    }
  }

  console.error("No successful response received.");
  return null; // Return null if no successful response received
};

function usePreventMobileHoldImage() {
  useEffect(() => {
    // Add event handler to all image elements using jQuery
    $("img").on("contextmenu dragstart", function (event) {
      event.preventDefault(); // Prevent the default context menu and dragging behavior
    });
    // Set draggable="false" attribute to all image elements
    $("img").attr("draggable", "false");
  }, []);
}
export default fetchDataFromLinks;

export { addVisitedPage, fetchDataFromLinks, usePreventMobileHoldImage };
