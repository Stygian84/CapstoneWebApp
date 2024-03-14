import { useEffect } from "react";

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

function usePreventMobileHoldImage() {
  useEffect(() => {
    const $ = require("jquery");
    // Add event handler to all image elements using jQuery
    $("img").on("contextmenu dragstart", function (event) {
      event.preventDefault(); // Prevent the default context menu and dragging behavior
    });
    // Set draggable="false" attribute to all image elements
    $("img").attr("draggable", "false");
  }, []);
}

export { addVisitedPage, usePreventMobileHoldImage };
