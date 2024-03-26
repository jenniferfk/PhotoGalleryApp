import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const FavoritesScreen: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const isFocused = useIsFocused();
  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites !== null) {
        setFavorites(JSON.parse(storedFavorites));
        console.log('Favorites loaded:', JSON.parse(storedFavorites));
      } else {
        console.log('No favorites found.');
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };
  
  useEffect(() => {
    if (isFocused) {
    loadFavorites();
    }
  }, [isFocused,loadFavorites]);

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No favorites found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <Image source={{ uri: `file://${item}` }} style={styles.image} />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
      />
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const itemMargin = 5;
const itemSize = (windowWidth - 4 * itemMargin) / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: itemMargin,
    backgroundColor: '#fff',
  },
  image: {
    width: itemSize,
    height: itemSize,
    marginBottom: itemMargin,
    margin: 5,
  },
  text:{
    color:'black',
  },
});

export default FavoritesScreen;
