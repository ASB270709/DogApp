import React, { useState, useEffect } from 'react';
import { View, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DogImageView = () => {
  const [dogImage, setDogImage] = useState(null);

  useEffect(() => {
    fetchRandomDogImage();
  }, []);

  const fetchRandomDogImage = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setDogImage(data.message);
    } catch (error) {
      console.error('No se pudo obtener una imagen:', error);
    }
  };

  const saveDogImage = async () => {
    try {
      await AsyncStorage.setItem('dogImage', dogImage);
      alert('Imagen guardada exitosamente');
    } catch (error) {
      console.error('Error al intentar guardar la imagen:', error);
    }
  };

  return (
    <View>
      <Image source={{ uri: dogImage }} style={{ width: 200, height: 200 }} />
      <Button title="Obtener imagen" onPress={fetchRandomDogImage} />
      <Button title="Guardar imagen" onPress={saveDogImage} />
    </View>
  );
};

export default DogImageView;
