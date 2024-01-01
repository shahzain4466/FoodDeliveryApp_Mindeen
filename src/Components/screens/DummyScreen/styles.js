import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  box: {
    height: 100,
    width: 100,
    backgroundColor: 'red',
    margin: 100,
  },
  container: {
    position: 'relative',
    zIndex: 1,
  },
  shadow: {
    position: 'absolute',
    top: -10, // Adjust this value to control the distance of the shadow from the top
    left: 0,
    right: 0,
    height: 10, // Adjust this value to control the height of the shadow
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the color and opacity of the shadow
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2, // This property is specific to Android
  },


})

export default styles