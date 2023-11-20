function addVisitedPage(page) {
  const visitedPages = JSON.parse(localStorage.getItem("visitedPages")) || [];
  if (!visitedPages.includes(page)) {
    // Add the new page to the beginning of the array
    visitedPages.unshift(page);

    // Trim the array to a maximum of 4 values
    if (visitedPages.length > 4) {
      visitedPages.splice(4);
    }

    // Save the updated array back to local storage
    localStorage.setItem("visitedPages", JSON.stringify(visitedPages));
  }
}

export { addVisitedPage };
