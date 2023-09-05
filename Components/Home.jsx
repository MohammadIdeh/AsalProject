import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const images = [
 { id: '1', source: require('./assets/food1.jpg') },
  { id: '2', source: require('./assets/images.jpg') },
  { id: '3', source: require('./assets/gym3.jpg') },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  useEffect(() => {
    const nextSlide = () => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      scrollViewRef.current.scrollTo({ x: nextIndex * width });
  
      if (nextIndex === 0) {
        setTimeout(() => {
          setCurrentIndex(0);
          scrollViewRef.current.scrollTo({ x: 0 });
        }, 200);  
      } else {
        setTimeout(nextSlide, 2000); 
      }
    };
  
    const timeout = setTimeout(nextSlide, 2000);
  
    return () => {
      clearTimeout(timeout);
    };
  }, [currentIndex]);
  
  const handleMomentumScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(offsetX / width);
    setCurrentIndex(newIndex);
  };

  const handleStart = () => {
    
  };

  return (
    <View style={styles.container}>
      {/* Image Slider */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentContainerStyle={styles.imageContainer}
      >
        {images.map((item, index) => (
          <Image
            key={item.id}
            source={item.source}
            style={[styles.image, { width, height }]}
          />
        ))}
      </ScrollView>

      {/* Text Container */}
      <View style={styles.textContainer}>
        {/* Header */}
        <Text style={styles.header}>Food Calculator</Text>

        {/* Start Button */}
        <View style={styles.buttonContainer}>
          <Button title="Start" onPress={handleStart} />
        </View>
      </View>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  index === currentIndex ? '#007aff' : '#ccc',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    top: 435,
    
  },
  textContainer: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    borderColor: 'black', // Set the border color to black
    borderWidth: 4,       // Set the border width
    margin: 20,
    backgroundColor: 'transparent', // Set the background color to transparent
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white', // Set the text color to white
  },

  imageContainer: {
    flexGrow: 1,
  },
  image: {
    resizeMode: 'cover',
    width,
    height,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
});

export default Home;
