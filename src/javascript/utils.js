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

// Prevent mobile from hold and drag images
function usePreventMobileHoldImage() {
  useEffect(() => {
    const $ = require("jquery");
    $("img").on("contextmenu dragstart", function (event) {
      event.preventDefault(); 
    });
    $("img").attr("draggable", "false");
  }, []);
}

export { addVisitedPage, usePreventMobileHoldImage };
