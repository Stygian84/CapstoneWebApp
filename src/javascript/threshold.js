import { goodBadTable } from "./table";

const statusMapping = {};

// Function to generate the status mapping based on the goodBadTable
for (const property in goodBadTable) {
  const { min, max } = goodBadTable[property];
  statusMapping[property] = (value) => {
    if (value >= min && value <= max) {
      return 'Good';
    } else if (value < min) {
      return 'Bad';
    } else {
      return 'Moderate';
    }
  };
}

// Function to get the status based on property and value
function getStatus(property, value) {
  const mappingFunction = statusMapping[property];
  if (!mappingFunction) {
    console.error(`Mapping function not found for property: ${property}`);
    return null;
  }

  return mappingFunction(value);
}
export default getStatus;