import React, { useEffect, useState , useCallback} from 'react';
import { View, StyleSheet, Image,Text,Pressable } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { MainNavigatorStackNavigationProp } from '../navigation/MainNavigator.types';

interface Photo {
  id: number;
  latitude: string;
  longitude: string;
  imageUri: string;
  count?: number;
  images:string[];
}

const MapScreen: React.FC = () => {
  const [uniqueMarkers, setUniqueMarkers] = useState<Photo[]>([]);
  const navigation = useNavigation<MainNavigatorStackNavigationProp>();
  const isFocused = useIsFocused();

  const handleMarkerPress = (marker: Photo) => {
    navigation.navigate('Images', { imageUri: marker.images });
  };
  const fetchPhotoData = useCallback(async () => {
    try {
        const response = await axios.get('https://65feeea1b2a18489b386c389.mockapi.io/images');
        const data = response.data;
        if (data.length === 0) {
            return; 
          }
        const item = data.map((item: any) => ({ id: item.id, imageUri: item.path, longitude: item.longitude, latitude: item.latitude }));  
      const groupedPhotos = groupPhotosByCoordinates(item);
      const markers = convertToMarkers(groupedPhotos);
      setUniqueMarkers(markers);
    } catch (error) {
      console.error('Error fetching photo data:', error);
    }
  },[]);
  

  const groupPhotosByCoordinates = (photos: Photo[]): Record<string, Photo[]> => {
    const grouped: Record<string, Photo[]> = {};
    photos.forEach((photo) => {
      const key = `${photo.latitude}_${photo.longitude}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(photo);
    });
    return grouped;
  };
  

  const convertToMarkers = (groupedPhotos: Record<string, Photo[]>): Photo[] => {
    const markers: Photo[] = [];
    for (const key in groupedPhotos) {
        if (Object.hasOwnProperty.call(groupedPhotos, key)) {
            const photos = groupedPhotos[key];
            markers.push({
              id: photos[0].id,
              latitude: photos[0].latitude,
              longitude: photos[0].longitude,
              imageUri: photos[0].imageUri,
              count: photos.length,
              images: photos.map(photo => photo.imageUri)
            });
          }
        }
    return markers;
  };
  const renderMarker = (marker: Photo) => {
    return (

      <Marker
      key={marker.id}
        coordinate={{ latitude:parseFloat( marker.latitude), longitude: parseFloat(marker.longitude) }}
        onPress={() => handleMarkerPress(marker)}
      >
          <View style={styles.markerContainer}>
            <Image source={{ uri: marker.imageUri }} style={styles.markerImage} />
            {marker.count !== undefined && ( 
              <View style={styles.countContainer}>
                <Text style={styles.countText}>{marker.count}</Text>
              </View>
            )}
          </View>
      </Marker>
    );
  };
  
  useEffect(() => {
    if (isFocused) {
      fetchPhotoData();
    }
  }, [isFocused, fetchPhotoData]);
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: (34.68 + 33.06) / 2,
          longitude: (35.12 + 36.63) / 2,
          latitudeDelta: 0.8,
          longitudeDelta: 0.8,
        }}
      >
        {uniqueMarkers.map(renderMarker)}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
      markerContainer: {
        position: 'relative',
        backgroundColor:'white',
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      markerImage: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        alignSelf:'center'
      },
      countContainer: {
        position: 'absolute',
        top: -4, 
        right: -3, 
        backgroundColor: 'blue',
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
      },
      countText: {
        color: 'white',
        fontSize: 8,
        alignSelf:'center'
      },
    });

export default MapScreen;
