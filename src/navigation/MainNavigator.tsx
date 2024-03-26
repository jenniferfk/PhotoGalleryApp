import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, PixelRatio } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MainNavigatorBottomTabParamList, MainNavigatorStackParamList } from './MainNavigator.types';
import CustomBottomTabContent from '../organisms/CustomBottomTabContent';
import CameraScreen from '../screens/CameraScreen';
import PhotoDetails from '../screens/PhotoDetails';
import PhotoLibraryScreen from '../screens/PhotoLibraryScreen';
import ImageDisplayPage from '../screens/ImageDisplayPage';
import MapScreen from '../screens/Maps';
import FavoritesScreen from '../screens/FavoritesScreen';
import { TransitionPresets } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';

enableScreens();

const pixelRatio = PixelRatio.getFontScale();

const MainTabNavigator = createBottomTabNavigator<MainNavigatorBottomTabParamList>();
const Stack = createStackNavigator<MainNavigatorStackParamList>();

const MainNavigator = () => {
  return (
      <MainTabNavigator.Navigator tabBar={(props) => <CustomBottomTabContent {...props} />}>
        <MainTabNavigator.Screen name="Cam" component={CameraScreen} />
        <MainTabNavigator.Screen name="Photos" component={PhotoStack} />
        <MainTabNavigator.Screen name="Maps" component={MapLocation} />
        <MainTabNavigator.Screen name="Fav" component={FavoritesScreen} />
      </MainTabNavigator.Navigator>
  );
};

const PhotoStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen name="Photostack" component={PhotoLibraryScreen}  options={{ headerShown: false }} />
      <Stack.Screen name="Details" component={PhotoDetails} />
    </Stack.Navigator>
  );
};

const MapLocation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen name="MapLocation" component={MapScreen}  options={{ headerShown: false }}/>
      <Stack.Screen name="Images" component={ImageDisplayPage} />
    </Stack.Navigator>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20 * pixelRatio,
  },
});
