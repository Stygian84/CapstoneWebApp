function addVisitedPage(page) {
  const visitedPages = JSON.parse(localStorage.getItem("visitedPages")) || [];
  const filteredPages = visitedPages.filter((visitedPage) => visitedPage !== page);
  filteredPages.unshift(page);

  if (filteredPages.length > 4) {
    filteredPages.splice(4);
  }
  
  localStorage.setItem("visitedPages", JSON.stringify(filteredPages));
}


export { addVisitedPage };
