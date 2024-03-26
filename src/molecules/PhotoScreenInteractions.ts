import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import axios from 'axios';

interface ImageData {
    id: number;
    path: string;
    longitude: string;
    latitude: string;
  }

export const handleDelete = async (imageId: number, setCapturedImages: Function) => {
    try {
      await axios.delete(`https://65feeea1b2a18489b386c389.mockapi.io/images/${imageId}`);
      setCapturedImages((prevImages: ImageData[]) => prevImages.filter(image => image.id !== imageId));

      const favorites = await AsyncStorage.getItem('favorites');
        if (favorites) {
            let updatedFavorites: string[] = JSON.parse(favorites);
            updatedFavorites = updatedFavorites.filter((favorite) => !favorite.includes(imageId.toString()));
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        }
        
      Alert.alert('Success', 'Image deleted successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete image');
    }
  };

export const handleLongPress = (imageId: number, imagePath: string, setCapturedImages: Function) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this image?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => handleDelete(imageId, setCapturedImages),
        },
      ],
      { cancelable: true }
    );
  };
