import { View, StyleSheet, Pressable, Text,  Alert,Linking,PermissionsAndroid } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Camera, useCameraDevice, useCameraPermission, } from 'react-native-vision-camera';
import Geolocation from '@react-native-community/geolocation';

interface CustomPosition {
      latitude: number;
      longitude: number;
  }

const CameraScreen = () => {
    const { requestPermission: requestCameraPermission, hasPermission: cameraPermission } = useCameraPermission();
  const device = useCameraDevice("back");
  const camera = useRef<Camera>(null);
  const [position, setPosition] = useState<CustomPosition | null>(null);


  useEffect(() => {
    handlePermissions();
  }, []);
  const handlePermissions = async () => {
    try {
      const grantedCamera = await requestCameraPermission();
      if (cameraPermission === true && device != null) {
        console.log('Camera permission granted');
        setIsCameraVisible(true);
      } else {
        console.log('Camera permission denied');
      }

      const grantedLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
    } catch (err) {
      console.warn('Error requesting permissions:', err);
    }
  };

  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<null | string>(null);

  const openCamera = () => setIsCameraVisible(true);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
        async (pos: any) => {
            if (pos.coords && typeof pos.coords.latitude === 'number' && typeof pos.coords.longitude === 'number') {
                const latitude = pos.coords.latitude;
                const longitude = pos.coords.longitude;
                setPosition({ latitude, longitude });
                console.log(longitude,latitude)
            }
        },
        (error: any) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
        { enableHighAccuracy: true }
    );
};
const takePhoto = async () => {
    try {
        await getCurrentPosition();
        const photo = await camera.current?.takePhoto();
        if (!photo || !photo.path) {
            return;
        }
        
        const imagepath = `file://${photo.path}`;
        const { latitude, longitude } = position || {};

        if (latitude !== undefined && longitude !== undefined) {
            const response = await fetch('https://65feeea1b2a18489b386c389.mockapi.io/images', {
                method: 'POST',
                body: JSON.stringify({ path: imagepath, longitude: String(longitude), latitude: String(latitude) }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Image uploaded successfully');
        } else {
            console.log('Latitude or longitude is undefined');
        }
    } catch (error) {
        console.error('Error capturing and uploading image:', error);
    }
};


  if (!device) {
    return <Text>Camera device not available.</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      {cameraPermission === true && device != null && (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            isActive={true}
            device={device}
            pixelFormat="yuv"
            photo={true}
          />
            <Pressable onPress={takePhoto} style={styles.takePhoto} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  takePhoto: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 50,
    width: 75,
    height: 75,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 75,
  },
});

export default CameraScreen;
