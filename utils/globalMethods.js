import {PermissionsAndroid} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

//* Request Location Access
export const requestLocationPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Allow Location Permission',
          message: 'Needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted.');
        return true;
      } else {
        console.log('Location permission denied.');
        return false;
      }
    } else {
      console.log('Location permission granted by default on iOS.');
      return true;
    }
  } catch (err) {
    console.warn('Error occurred while accessing your location:', err);
    return false;
  }
};

//* Extract Place Name from (Long, Lat)
export const getPlaceName = async (latitude, longitude) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`,
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const placeName = data.results[0].formatted_address;
      const addressComponents = data.results[0].address_components;
      const getAddressComponent = type => {
        const component = addressComponents.find(comp =>
          comp.types.includes(type),
        );
        return component ? component.long_name : '';
      };
      let street = getAddressComponent('route');
      const city = getAddressComponent('locality');
      const state = getAddressComponent('administrative_area_level_1');
      const country = getAddressComponent('country');
      const postalCode = getAddressComponent('postal_code');

      if (street === '' && country) {
        street = city;
      }

      const extractedData = {
        street,
        city,
        state,
        country,
        postalCode,
      };
      return {placeName, extractedData};
    }
  } catch (error) {
    console.warn('Error reverse geocoding:', error);
  }
  return null; // Return null if geocoding fails
};

//* Pick Image From Gallery
export const pickImage = async () => {
  try {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });
    if (!response.didCancel && response.assets.length > 0) {
      return {
        uri: String(response.assets[0].uri),
        name: String(response.assets[0].fileName),
        type: String(response.assets[0].type),
      };
    }
  } catch (error) {
    console.log('Error While Getting Image From Gallery:', error);
  }
};

export const pickImageCamera = async () => {
  try {
    const response = await launchCamera({
      mediaType: 'photo',
      quality: 1,
    });
    if (!response.didCancel && response.assets.length > 0) {
      return {
        uri: String(response.assets[0].uri),
        name: String(response.assets[0].fileName),
        type: String(response.assets[0].type),
      };
    }
  } catch (error) {
    console.log('Error While Getting Image From Gallery:', error);
  }
};

//* Suggest The Places Based On Passed Address
export const geocodePlaceName = async placeName => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const encodedPlaceName = encodeURIComponent(placeName);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedPlaceName}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      const {lat, lng} = data.results[0].geometry.location;
      return {
        latitude: lat,
        longitude: lng,
      };
    } else {
      console.error('Geocoding failed:', data.status);
      return null;
    }
  } catch (error) {
    console.error('Error geocoding place name:', error);
    return null;
  }
};

//* API Error Logger
export const handleErrors = (error, endpointName) => {
  if (error.response) {
    // Error received with a response from the server
    const {status, data} = error.response;
    console.log(`Error while getting ${endpointName}`, status, data);
    return data;
  } else if (error.request) {
    // Error occurred but no response received from the server
    console.log(`Error while getting --- ${endpointName}`, error.request);
    return {message: 'No response received from the server.'};
  } else {
    // Other errors such as network errors or exceptions
    console.log(`Error while getting ${endpointName}`, error.message);
    return {message: 'Something went wrong while processing the request.'};
  }
};

//* Password Validator
export const validatePassword = password => {
  // Regex pattern for validating password
  const passwordPattern =
    // /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[a-zA-Z0-9\W_]{8,}$/;
  return passwordPattern.test(password);
};

//* Email Validator
export const isValidEmail = email => {
  // Regular expression pattern for email validation
  // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const emailPattern = /^\w+([\.-]?\w+)*@gmail+([\.-]?\w+)*(\.\w{2,3})+$/;
  //  domain = email.split('@', 1)
  // const emailPattern = /^\w+([\.-]?\w+)*@gmail\.com$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|example\.com)$/i;

  return emailPattern.test(email);
};
