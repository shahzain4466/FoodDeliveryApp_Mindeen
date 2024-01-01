import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import {View, Pressable, FlatList, ActivityIndicator} from 'react-native';
import styles from './styles';
//* Icons
import AimeIcon from '../../../assets/svg/AimeIcon.svg';
import SuccessTick from '../../../assets/svg/SuccessTick.svg';
//* Components
import Frame from '../../common/core/Frame';
import CustomTouchableOpacity from '../../common/core/touchableopacity/CustomTouchableOpacity';
import Txt from '../../common/core/Txt';
import Button from '../../common/core/Button';
import ExpandableView from '../../common/others/ExpandableView/ExpandableView';
//* Others
import {
  getPlaceName,
  requestLocationPermission,
} from '../../../../utils/globalMethods';
import {Strings} from '../../../constants/Strings';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker} from 'react-native-maps';
import theme from '../../../themes/theme';
import {Screens} from '../../../constants/constants';
import {useDispatch, useSelector} from 'react-redux';
import {GetAllLocation} from '../../../redux/action/Location/GetAllLocation';
import {DeleteLocation} from '../../../redux/action/Location/DeleteLocation';
import {useIsFocused} from '@react-navigation/native';
import {CleanupDeleteLocation} from '../../../redux/slices/LocationSlice/DeleteLocationSlice';

export default function LocationsScreen({navigation}) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentLocationName, setCurrentLocationName] = useState('');
  const [deletedItemId, setDeletedItemId] = useState(null);
  const [locations, setLocations] = useState([]);
  const [markerLocation, setMarkerLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [selectedItem, setSelectedItem] = useState('currentLocationComp');
  const [showSecondBtm, setShowSecondBtm] = useState(false);
  const [errorState, setError] = useState({status: false, msg: ''});
  const mapViewRef = useRef(null);
  const isFocused = useIsFocused();
  //* Getting Token From Stored Data
  const {token} = useSelector(state => state.userData.isAuthenticated);
  const dispatch = useDispatch();
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
        requestLocationPermission();
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
      setCurrentLocationName(placeName.placeName);
    }
  };
  const handlePoiClick = e => {
    setMarkerLocation(e.nativeEvent.coordinate);
    reverseGeocode(
      e.nativeEvent.coordinate.latitude,
      e.nativeEvent.coordinate.longitude,
    );
  };
  //* Trigger getLocation() to Get The Current Location
  useEffect(() => {
    getLocation();
  }, [getLocation]);
  //* Set The Marker if The Current Location is Changed
  useEffect(() => {
    if (currentLocation) {
      setMarkerLocation({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      });
    }
  }, [currentLocation]);

  //? API'S Logic
  //* Get Location API
  const getLocationApi = useSelector(state => state.getLocation);
  //* Memoize Him
  const {
    data: getLocationData,
    loading: getLocationLoading,
    error: getLocationError,
  } = useMemo(() => getLocationApi, [getLocationApi]);
  useEffect(() => {
    dispatch(GetAllLocation(token));
  }, [dispatch, token, isFocused]);

  useEffect(() => {
    if (getLocationLoading) {
      // console.log('loading State:-------->', getLocationLoading);
      setError({status: false, msg: ''});
    } else if (getLocationError) {
      // console.log('error State:-------->', getLocationError);
      const {message, success} = getLocationError;
      setError({status: !success, msg: message});
    } else if (getLocationData) {
      console.log('Data:-', getLocationData);
      setLocations(getLocationData.data.address);
      setError({status: false, msg: ''});
    }
  }, [getLocationData, getLocationLoading, getLocationError]);

  //* Deleted Location API
  const deletedLocationApi = useSelector(state => state.deleteLocation);
  //* Memoize Him
  const {
    data: deleteLocationData,
    loading: deleteLocationLoading,
    error: deleteLocationError,
  } = useMemo(() => deletedLocationApi, [deletedLocationApi]);

  const handleDeleteLocation = (id, token) => {
    dispatch(DeleteLocation(id, token));
  };

  useEffect(() => {
    if (deleteLocationLoading) {
      // console.log('loading State:-------->', deleteLocationLoading);
      setError({status: false, msg: ''});
    } else if (deleteLocationError) {
      // console.log('error State:-------->', deleteLocationError);
      const {message, success} = deleteLocationError;
      setError({status: !success, msg: message});
    } else if (deleteLocationData) {
      console.log('Data:-', deleteLocationData);
      setError({status: false, msg: ''});
      setDeletedItemId(null);
      dispatch(GetAllLocation(token));
      deletedBtm.current?.expandBottomSheet();
      setShowSecondBtm(true);
    }
  }, [deleteLocationData, deleteLocationLoading, deleteLocationError]);

  useEffect(() => {
    return () => {
      dispatch(CleanupDeleteLocation());
    };
  }, []);

  //* FlatList Logic
  //* Header
  const headerComp = (
    <View>
      <Txt style={styles.title}>{Strings.locTitle}</Txt>
      {/* Current Location */}
      <Pressable
        onPress={() => {
          setSelectedItem('currentLocationComp');
        }}
        style={[
          styles.currentLocationContainer,
          {
            borderColor:
              selectedItem === 'currentLocationComp'
                ? theme.palette.PrimaryDeep
                : theme.palette.GrayLight,
          },
        ]}>
        <View style={styles.currentLocationHeaderContainer}>
          <Txt numberOfLines={2} style={styles.currentLocation}>
            {currentLocationName}
          </Txt>
          <CustomTouchableOpacity onPress={handleZoomToCurrentLocation}>
            <AimeIcon />
          </CustomTouchableOpacity>
        </View>
        <View style={styles.mapContainer}>
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
        </View>
      </Pressable>
      <View style={styles.devider} />
    </View>
  );
  //* Footer
  const footerComp = (
    <Button
      singleButtonStyle={styles.btn}
      title={Strings.locMainBtnTitle}
      onPress={() => {
        navigation.navigate(Screens.Map);
      }}
    />
  );
  //* On Empty Addresses
  const OnEmptyComp = (
    <>
      {!getLocationLoading ? (
        <View>
          <Txt style={styles.noAddressFound}>{Strings.locEmptyList}</Txt>
        </View>
      ) : (
        <ActivityIndicator size="large" color={theme.palette.PrimaryDeep} />
      )}
    </>
  );
  //render Item
  const renderItem = ({item}) => {
    return (
      <View style={styles.renderItemContainer}>
        <ExpandableView
          data={item}
          onPress={() => {
            setSelectedItem(item);
          }}
          selected={selectedItem === item}
          onDelete={() => {
            delBtm.current?.expandBottomSheet();
            setShowSecondBtm(false);
            setDeletedItemId(item._id);
          }}
        />
      </View>
    );
  };

  //* Bottom Sheets Logic
  //* Delete Location
  const delBtm = useRef(null);
  const snapPointDeleteBtm = useMemo(() => ['35%'], []);
  const deleteLocationBtm = (
    <View style={styles.btmContainer}>
      <Txt style={styles.delBtmTitle}>{Strings.locBtmTwoTitle}</Txt>
      <Txt style={styles.delBtmDesc}>{Strings.locBtmTwoDesc}</Txt>
      <Button
        variant={'v1'}
        continueTitle={'Yes'}
        cancelTitle={'No'}
        loading={deleteLocationLoading}
        onCancel={() => {
          delBtm.current?.closeBottomSheet();
          setShowSecondBtm(false);
          setDeletedItemId(null);
        }}
        onContinue={() => {
          handleDeleteLocation(deletedItemId, token);
        }}
      />
    </View>
  );
  //* Location Deleted
  const deletedBtm = useRef(null);
  const snapPointDeletedBtm = useMemo(() => ['40%'], []);
  const locationDeletedBtm = (
    <View style={styles.btmContainer}>
      <View style={styles.successTickIconContainer}>
        <SuccessTick />
      </View>
      <Txt
        style={[styles.delBtmTitle, {marginVertical: theme.spacing.margin.m1}]}>
        {Strings.locBtmOneTitle}
      </Txt>
      <Button
        title={Strings.locBtnBtmOneTitle}
        onPress={() => {
          deletedBtm.current?.closeBottomSheet();
          setShowSecondBtm(false);
        }}
      />
    </View>
  );

  return (
    <Frame
      showBottomSheet={true}
      snapPoints={showSecondBtm ? snapPointDeletedBtm : snapPointDeleteBtm}
      bottomSheetContent={
        showSecondBtm ? locationDeletedBtm : deleteLocationBtm
      }
      // headerVariant={'blank'}
      ref={showSecondBtm ? deletedBtm : delBtm}
      style={styles.container}
      mode={'view'}
      // customNavigation={{screen: Screens.MainMenu}}
    >
      <FlatList
        data={locations}
        renderItem={renderItem}
        ListHeaderComponent={headerComp}
        ListFooterComponent={footerComp}
        contentContainerStyle={{flexGrow: 1}}
        ListFooterComponentStyle={styles.footer}
        ListHeaderComponentStyle={styles.header}
        ListEmptyComponent={OnEmptyComp}
      />
    </Frame>
  );
}
