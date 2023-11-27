import { Image } from 'react-native';
import ImageResizer from 'react-native-image-resizer';

const getImageSize = (uri) => {
  return new Promise((resolve) => {
    Image.getSize(uri, (width, height) => {
      resolve({ width, height });
    });
  });
};

const calculateNewSize = (width, height) => {
  if (width > height) {
    const ratio = width / height;
    const newHeight = parseInt(1024 / ratio, 10);

    return { newWidth: 1024, newHeight };
  } else {
    const ratio = height / width;
    const newWidth = parseInt(1024 / ratio, 10);

    return { newWidth, newHeight: 1024 };
  }
};

const prepareImageToUpload = async (imagePath) => {
  const params = { uri: imagePath, name: 'image.jpg', type: 'image/*' };

  const { width, height } = await getImageSize(imagePath);
  if (width > 1024 || height > 1024) {
    const { newWidth, newHeight } = calculateNewSize(width, height);

    const response = await ImageResizer.createResizedImage(imagePath, newWidth, newHeight, 'JPEG', 90);
    params.uri = response.uri;
  }

  const data = new FormData();
  data.append('file', params);
  return data;
};

export default prepareImageToUpload;
