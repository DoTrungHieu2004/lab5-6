import { useState } from 'react';
import { StyleSheet, Image, View, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ExpoCamera() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== 'granted') {
        alert('Bạn cần cấp quyền truy cập camera để chụp ảnh');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Lỗi khi mở camera:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={imageUri ? { uri: imageUri} : require('../../assets/images/DefaultImage.png')}
      />
      <Button title='Chụp ảnh' onPress={takePhoto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 30
  }
});