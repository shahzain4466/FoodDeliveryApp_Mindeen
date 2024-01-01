import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import {View} from 'react-native';
import styles from './styles';
import Frame from '../../common/core/Frame';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {getPlaceName} from '../../../../utils/globalMethods';
import Txt from '../../common/core/Txt';
import Button from '../../common/core/Button';
import {Strings} from '../../../constants/Strings';
import MarkerIcon from '../../../assets/svg/LocationMarker.js';
import SuccessIcon from '../../../assets/svg/SuccessTick.svg';
import {Screens} from '../../../constants/constants';
import {useDispatch, useSelector} from 'react-redux';
import {AddLocation} from '../../../redux/action/Location/AddLocation';
import {CleanupAddLocation} from '../../../redux/slices/LocationSlice/AddLocationSlice';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import theme from '../../../themes/theme';
import {scale} from '../../../../utils/scale';
import SearchIcon from '../../../assets/svg/SearchV2.svg';

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

export default function OrderMap({navigation, route}) {
  const {cartItem} = route.params;
  console.log(cartItem);

  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentLocationName, setCurrentLocationName] = useState('');
  const [formattedLocation, setFormattedLocation] = useState({});
  const [inputVal, setInputVal] = useState(null);
  const [markerLocation, setMarkerLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [errorState, setError] = useState({status: false, msg: ''});
  //* Getting Token From Stored Data
  const {token} = useSelector(state => state.userData.isAuthenticated);
  const dispatch = useDispatch();
  //* MAP Logic
  const mapViewRef = useRef(null);
  //* Get Current Location (Long, Lat)
  const getLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
        animateToLocation(latitude, longitude);
        reverseGeocode(latitude, longitude);
        setMarkerLocation({latitude, longitude});
      },
      error => {
        console.warn('Error getting current location:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, [
    animateToLocation,
    reverseGeocode,
    setMarkerLocation,
    setCurrentLocation,
  ]);

  //* Animate Back To Location, Based on Provided (Lat, Long)
  const animateToLocation = (latitude, longitude) => {
    if (mapViewRef.current) {
      mapViewRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };
  //* Zoom Back to Current Location
  const handleZoomToCurrentLocation = () => {
    if (currentLocation) {
      animateToLocation(currentLocation.latitude, currentLocation.longitude);
      setMarkerLocation({
        latitude: currentLocation?.latitude,
        longitude: currentLocation?.longitude,
      });
      reverseGeocode(currentLocation.latitude, currentLocation.longitude);
    }
  };
  //* Get Location Name From (Lat, Long)
  const reverseGeocode = async (latitude, longitude) => {
    const placeName = await getPlaceName(latitude, longitude);
    if (placeName) {
      setFormattedLocation(placeName.extractedData);
      setCurrentLocationName(placeName.placeName);
    }
  };

  //* API Logic (Add Location)
  const addLocation = useSelector(state => state.addLocation);
  //* Memoize Him
  const {data, loading, error} = useMemo(() => addLocation, [addLocation]);
  const handleAddLocation = (address, token) => {
    dispatch(AddLocation(address, token));
  };

  const handlePoiClick = e => {
    setMarkerLocation(e.nativeEvent.coordinate);
    reverseGeocode(
      e.nativeEvent.coordinate.latitude,
      e.nativeEvent.coordinate.longitude,
    );
  };

  useEffect(() => {
    if (loading) {
      setError({status: false, msg: ''});
    } else if (error) {
      const {message, success} = error;
      setError({status: !success, msg: message});
    } else if (data) {
      BtmRef.current?.expandBottomSheet();
      console.log('Data:-', data);
      setError({status: false, msg: ''});
    }
  }, [data, loading, error]);

  useEffect(() => {
    return () => {
      dispatch(CleanupAddLocation());
    };
  }, [navigation, dispatch]);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    if (currentLocation) {
      setMarkerLocation({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      });
    }
  }, [currentLocation]);

  //* Location Marker
  const MapMarker = () => (
    <View style={styles.mapMarkerOuterBg}>
      <View style={styles.mapMarkerInnerBg}>
        <MarkerIcon height={32} width={32} />
      </View>
    </View>
  );

  //* Bottom Sheet Logic
  //* Bottom Sheet Code
  const BtmRef = useRef(null);
  const snapPoints = useMemo(() => ['35%'], []);
  const BtmContent = (
    <View style={styles.btmContainer}>
      <View style={styles.successIcon}>
        <SuccessIcon />
      </View>
      <Txt style={styles.btmTitle}>{Strings.mapBtmTitle}</Txt>
      <Button
        title={Strings.close}
        onPress={() => {
          navigation.navigate(Screens.MYAddresses, {cartItem: cartItem});
          BtmRef.current?.closeBottomSheet();
        }}
      />
    </View>
  );

  //! Test
  const SearchIconComp = () => {
    return (
      <View
        style={{
          position: 'absolute',
          left: scale(10, true),
          top: scale(-4),
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
        }}>
        <SearchIcon />
      </View>
    );
  };
  //! Test

  return (
    <Frame
      showBottomSheet={true}
      snapPoints={snapPoints}
      bottomSheetContent={BtmContent}
      ref={BtmRef}
      headerVariant={'v1'}
      style={styles.container}
      mode={'view'}
      screenTitle={Strings.mhTitle}>
      <MapView
        ref={mapViewRef}
        style={{flex: 1}}
        onPoiClick={val => handlePoiClick(val)}
        initialRegion={{
          latitude: currentLocation?.latitude || 0,
          longitude: currentLocation?.longitude || 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={({nativeEvent}) => {
          const {latitude, longitude} = nativeEvent.coordinate;
          setMarkerLocation(nativeEvent.coordinate);
          reverseGeocode(latitude, longitude);
        }}>
        {currentLocation && (
          <Marker
            coordinate={markerLocation}
            draggable
            onDragEnd={e => {
              const {latitude, longitude} = e.nativeEvent.coordinate;
              setMarkerLocation(e.nativeEvent.coordinate);
              reverseGeocode(latitude, longitude);
            }}></Marker>
        )}
      </MapView>

      <View style={styles.headerContainer}>
        <GooglePlacesAutocomplete
          placeholder={Strings.mapSearchPlaceHolder}
          query={{key: apiKey}}
          fetchDetails={true}
          debounce={200}
          enablePoweredByContainer={false}
          textInputProps={{
            placeholderTextColor: theme.palette.GrayDark,
            value: inputVal,
            onChangeText: text => setInputVal(text),
          }}
          renderLeftButton={SearchIconComp}
          // !TODO SOrt Me out
          // currentLocation={true}
          // currentLocationLabel="Current location"
          styles={{
            textInput: {
              backgroundColor: theme.palette.white,
              borderRadius: theme.radius.r3,
              paddingHorizontal: theme.spacing.padding.p5,
              paddingVertical: theme.spacing.padding.p4,
              paddingLeft: theme.spacing.padding.max / 0.8,
              color: theme.palette.TypographyDeep,
              width: '100%',
              letterSpacing: scale(0.8),
              ...theme.typography.common.h3r,
            },
            row: {
              padding: theme.spacing.padding.p5,
              borderRadius: theme.radius.r3,
              flexDirection: 'row',
            },
            listView: {
              backgroundColor: theme.palette.white,
              borderRadius: theme.radius.r3,
            },
            separator: {
              backgroundColor: theme.palette.GrayLight,
              width: '90%',
              alignSelf: 'center',
            },
            description: {
              color: theme.palette.TypographyDeep,
              letterSpacing: scale(0.8),
              ...theme.typography.common.h3r,
            },
          }}
          onPress={(data, details = null) => {
            if (details.geometry.location && details) {
              const {lat: latitude, lng: longitude} = details.geometry.location;
              setMarkerLocation({latitude, longitude});
              animateToLocation(latitude, longitude);
              reverseGeocode(latitude, longitude);
              setInputVal('');
            }
          }}
        />
      </View>
      <View style={styles.footerContainer}>
        <Txt style={styles.footerTitle}>{Strings.mapTitle}</Txt>
        <View style={styles.footerLocationContainer}>
          <View style={styles.markerIcon}>
            <MarkerIcon height={22} width={22} />
          </View>
          <Txt numberOfLines={2} style={styles.footerLocation}>
            {currentLocationName}
          </Txt>
        </View>
        <Button
          loading={loading}
          onPress={() => {
            handleAddLocation(formattedLocation, token);
          }}
          title={Strings.mapMainBtnTitle}
        />
      </View>
    </Frame>
  );
}
