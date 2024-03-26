import React from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { MainNavigatorStackParamList } from '../navigation/MainNavigator.types';
type ImageDisplayPageRouteProp = RouteProp<MainNavigatorStackParamList, 'Images'>;

type Props = {
  route: ImageDisplayPageRouteProp;
};

const ImageDisplayPage: React.FC<Props> = ({ route }) => {
  const { imageUri } = route.params;

  return (
    <View style={styles.container}>
      <FlatList
        data={imageUri}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

export default ImageDisplayPage;
