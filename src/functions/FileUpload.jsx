import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const uploadFile = async (file, setURL) => {
  if (!file) {
    console.error('No file provided');
    return;
  }

  const storageRef = ref(storage, `uploads/${file.name}`);
  
  try {
    // Upload file to Firebase Storage
    await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    
    // Set the download URL
    setURL(downloadURL);
    
    console.log('File uploaded successfully. URL:', downloadURL);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

export default uploadFile;
