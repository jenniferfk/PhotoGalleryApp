import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Image, Text, StyleSheet, Pressable, Alert, RefreshControl  } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { MainNavigatorStackNavigationProp } from '../navigation/MainNavigator.types';
import axios from 'axios';
import { handleLongPress } from '../molecules/PhotoScreenInteractions';
interface ImageData {
  id: number;
  path: string;
  longitude:string;
  latitude: string;
}

const PhotoScreen = () => {
  const [capturedImages, setCapturedImages] = useState<ImageData[]>([]);
  const navigation = useNavigation<MainNavigatorStackNavigationProp>();
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const isFocused = useIsFocused();

  const fetchImages = useCallback(async () => {
    try {
      const response = await axios.get('https://65feeea1b2a18489b386c389.mockapi.io/images');
      const data = response.data;
      const paths = data.map((item: any) => ({ id: item.id, path: item.path, longitude: item.longitude, latitude: item.latitude }));
      setCapturedImages(paths);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchImages();
    }
  }, [isFocused, fetchImages]);

  const handleViewDetails = (imageUri: string, id: number, longitude: string, latitude: string) => {
    navigation.navigate('Details', { imageUri ,id,longitude,latitude});
  };

  const handleLongPressWrapper = (imageId: number, imagePath: string) => {
    handleLongPress(imageId, imagePath, setCapturedImages);
  };
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    fetchImages();
    setRefreshing(false);
  }, [fetchImages]);

  const handleLoadMore = () => {
      if (!loadingMore) {
        setLoadingMore(true);
        setPage(prevPage => prevPage + 1);
        setLoadingMore(false);
      }
    };
  return (
    <View style={{ flex: 1 }}>
    <FlatList
        data={capturedImages}
        renderItem={({ item }) => (
          <Pressable onLongPress={() => handleLongPressWrapper(item.id, item.path)} onPress={() => handleViewDetails(item.path,item.id, item.longitude, item.latitude)}>
            <Image source={{ uri: item.path }} style={styles.image} />
          </Pressable>
        )}
        numColumns={3}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No images found</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
  </View>
  );
};

export default PhotoScreen;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  selectedImage: {
    width: 100,
    height: 100,
    margin: 5,
    alignSelf: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});
