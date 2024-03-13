import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

const fetchDataFromFirestore = async (level) => {
  try {
    const collectionRef = collection(firestore, `Level${level}`);
    const snapshot = await getDocs(collectionRef);
    const fetchedData = snapshot.docs.map(doc => ({ id: doc.id, value: doc.data().value }));
    return fetchedData;
  } catch (error) {
    console.error('Error fetching data from Firestore:', error);
    return [];
  }
};

export default fetchDataFromFirestore;
