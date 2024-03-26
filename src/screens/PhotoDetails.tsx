import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text,Pressable } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { MainNavigatorStackParamList } from '../navigation/MainNavigator.types';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';
type PhotoDetailsRouteProp = RouteProp<MainNavigatorStackParamList, 'Details'>;
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  route: PhotoDetailsRouteProp;
};

const PhotoDetails: React.FC<Props> = ({ route }) => {
  const { imageUri,id,longitude, latitude } = route.params;
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const parsedLatitude: number = parseFloat(latitude);
  const parsedLongitude: number = parseFloat(longitude);

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    if (favorites.includes(`${id}-${imageUri}`)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favorites, imageUri]);

const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites !== null) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = async (updatedFavorites: string[]) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const toggleFavorite = () => {
    let updatedFavorites: string[];
    const imageUrl = `${id}-${imageUri}`;
    if (!isFavorite) {
      updatedFavorites = [...favorites, imageUrl];
    } else {
      updatedFavorites = favorites.filter((favorite) => favorite !== imageUrl);
    }
    setFavorites(updatedFavorites);
    setIsFavorite(!isFavorite);
    saveFavorites(updatedFavorites);
  };


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
      <Pressable onPress={toggleFavorite} style={[styles.favoriteButton, isFavorite ? styles.favoriteButtonRed : null]}>
          <Text style={styles.favoriteButtonText}>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
        </Pressable>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: parsedLatitude,
            longitude: parsedLongitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <Marker
            coordinate={{
              latitude: parsedLatitude,
              longitude: parsedLongitude,
            }}
            title={`Photo ID: ${id}`}
          />
        </MapView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color:'black'
  },
  image: {
    width: '70%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  map: {
    width: '80%',
    height: 300,
  },
  favoriteButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginBottom: 10,
  },
  favoriteButtonRed:{
    backgroundColor:'red',
  },
  favoriteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PhotoDetails;

