import React, {useState, useMemo, useRef, useEffect, useCallback} from 'react';
import {
  FlatList,
  Text,
  View,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import styles from './styles';
//* Components
import Frame from '../../common/core/Frame';
import Input from '../../common/core/Input';
import CategoryComp from '../../common/others/CategoryComp/CategoryComp';
import {HomeCardRenderer} from '../../common/others/HomeCardRenderer/HomeCardRenderer';
import {GetAllLocation} from '../../../redux/action/Location/GetAllLocation';
import AimeIcon from '../../../assets/svg/AimeIcon.svg';
import MapView, {Marker} from 'react-native-maps';

//* Others
import Geolocation from 'react-native-geolocation-service';
import {Screens} from '../../../constants/constants';
import {Strings} from '../../../constants/Strings';
import HomeData from '../../../assets/dummy/Home.json';
import {useIsFocused} from '@react-navigation/native';
import ExpandableView from '../../common/others/ExpandableView/ExpandableView';
import Txt from '../../common/core/Txt';
import theme from '../../../themes/theme';
import CustomTouchableOpacity from '../../common/core/touchableopacity/CustomTouchableOpacity';
import {
  getPlaceName,
  requestLocationPermission,
} from '../../../../utils/globalMethods';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import Button from '../../common/core/Button';
import {DeleteLocation} from '../../../redux/action/Location/DeleteLocation';
import {GetProfileInfo} from '../../../redux/action/GetProfileInfo';
import {GetSearchCategory} from '../../../redux/action/SearchCategoriesAPI';
import {CartCounter} from '../../../redux/action/CartCounter';

const HomeScreen = ({navigation}) => {
  //UseMemo
  const BtmRef = useRef(null);
  const deletedBtm = useRef(null);
  const snapPoints = useMemo(() => ['85%'], []);
  const snapPointDeleteBtm = useMemo(() => ['35%'], []);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  //* Data States
  const {token} = useSelector(state => state.userData.isAuthenticated);
  const searchCategoryData = useSelector(state => state.searchCategory);
  const counter = useSelector(state => state.cartCounter.counter);
  // console.log("Search Category -->>>", searchCategoryData?.data);

  const [locations, setLocations] = useState([]);
  const [selectedItem, setSelectedItem] = useState('currentLocationComp');
  const [currentLocationName, setCurrentLocationName] = useState('');
  const [deliveryLocationName, setdeliveryLocationName] = useState('');
  const [deletedItemId, setDeletedItemId] = useState(null);
  const [showSecondBtm, setShowSecondBtm] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [markerLocation, setMarkerLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [selectedCategory, setSelectedCategory] = useState(
    HomeData.categories[0],
  );

  const handleCategoryPress = category => {
    setSelectedCategory(category);
  };
// console.log('postdata',HomeData.postData)

  const getLocationApi = useSelector(state => state.getLocation);
  // console.log('==<>',getLocationApi?.data?.data?.address);
  const mapViewRef = useRef(null);

  const {
    data: getLocationData,
    loading: getLocationLoading,
    error: getLocationError,
  } = useMemo(() => getLocationApi, [getLocationApi, showSecondBtm]);

  useEffect(() => {
    dispatch(GetProfileInfo(token));
    dispatch(CartCounter(counter));
  }, [isFocused, dispatch, token]);

  useEffect(() => {
    dispatch(GetAllLocation(token));
  }, [isFocused, token, dispatch]);

  useEffect(() => {
    dispatch(GetSearchCategory());
  }, [isFocused, dispatch]);

  useEffect(() => {
    if (getLocationLoading) {
    } else if (getLocationError) {
      const {message, success} = getLocationError;
    } else if (getLocationData) {
      setLocations(getLocationData.data.address);
    }
  }, [getLocationData, getLocationLoading, getLocationError]);
  //Delete Location
  const handleDeleteLocation = (id, token) => {
    dispatch(DeleteLocation(id, token));
  };
  
  //get Current Location
  useEffect(() => {
    getLocation();
  }, [getLocation, isFocused]);
  useEffect(() => {
    if (currentLocation) {
      setMarkerLocation({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      });
    }
  }, [currentLocation]);

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
  const handlePoiClick = e => {
    setMarkerLocation(e.nativeEvent.coordinate);
  };
  //* Get Location Name From (Lat, Long)
  const reverseGeocode = async (latitude, longitude) => {
    const placeName = await getPlaceName(latitude, longitude);
    if (placeName) {
      setCurrentLocationName(placeName.placeName);
      setdeliveryLocationName(
        placeName.extractedData.city + ' ' + placeName.extractedData.country,
      );
    }
  };
  //* Header Component
  const Header = (
    <View style={styles.header}>
      <Input
        placeholder={Strings.hmSearchPlaceHolder}
        search
        goToSearch
        editable={false}
      />
      {/* Categories */}
      <CategoryComp
        data={searchCategoryData?.data}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryPress}
      />
    </View>
  );
  const renderItem = ({item}) => {
    return (
      <View style={styles.renderItemContainer}>
        <ExpandableView
          data={item}
          onPress={() => {
            setSelectedItem(item);
            setdeliveryLocationName(item.city + ' ' + item.country);
          }}
          selected={selectedItem === item}
          onDelete={() => {
            deletedBtm.current?.expandBottomSheet();
            setShowSecondBtm(true);
            setDeletedItemId(item._id);
          }}
        />
      </View>
    );
  };

  //Header Component Bottom Sheet
  const HeaderComp = () => {
    return (
      <View>
        <Txt style={styles.title}>{Strings.locTitle}</Txt>
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
                console.log('onPress', nativeEvent.coordinate);
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
                  }}
                />
              )}
            </MapView>
          </View>
          <View style={styles.currentLocationHeaderContainer}>
            <Txt numberOfLines={2} style={styles.currentLocation}>
              {currentLocationName}
            </Txt>
            <CustomTouchableOpacity onPress={handleZoomToCurrentLocation}>
              <AimeIcon />
            </CustomTouchableOpacity>
          </View>
        </Pressable>
        <View style={styles.devider} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Screens.Map);
          }}>
          <Txt style={styles.newlocation}>{Strings.addNewAddress}</Txt>
        </TouchableOpacity>

        <Txt style={styles.slocation}>{Strings.saveLocation}</Txt>
      </View>
    );
  };
  //Bottom sheet Delete Content
  const deleteLocationBtm = (
    <View style={styles.btmContainer}>
      <Txt style={styles.delBtmTitle}>{Strings.locBtmTwoTitle}</Txt>
      <Txt style={styles.delBtmDesc}>{Strings.locBtmTwoDesc}</Txt>
      <Button
        variant={'v1'}
        continueTitle={'Yes'}
        cancelTitle={'No'}
        onCancel={() => {
          deletedBtm.current?.closeBottomSheet();
          setShowSecondBtm(false);
          setDeletedItemId(null);
        }}
        onContinue={() => {
          handleDeleteLocation(deletedItemId, token);
          setShowSecondBtm(false);
          deletedBtm.current?.closeBottomSheet();
        }}
      />
    </View>
  );
  //Bottom sheet
  const BtmContent = (
    <View style={styles.btmContainer}>
      <HeaderComp />
      <View style={{flex: 1}}>
        <BottomSheetFlatList
          style={{flex: 1}}
          data={locations}
          renderItem={renderItem}
        />
      </View>
    </View>
  );

  return (
    <Frame
      bottomSheetContent={showSecondBtm ? deleteLocationBtm : BtmContent}
      snapPoints={showSecondBtm ? snapPointDeleteBtm : snapPoints}
      ref={showSecondBtm ? deletedBtm : BtmRef}
      showBottomSheet={true}
      mode="view"
      style={styles.container}
      headerVariant={'v3'}
      screenTitle={deliveryLocationName}
      onPress={() => BtmRef.current?.expandBottomSheet()}>
      <FlatList
        data={HomeData.postData}
        ListHeaderComponent={Header}
        renderItem={({item}) => {
          return (
            <>
              {HomeData?.postData.length === 0 ? (
                <ActivityIndicator
                  size="small"
                  color={theme.palette.PrimaryDeep}
                />
              ) : (
                // <></>
                <HomeCardRenderer
                  onBtnClick={() => {
                    item?.name == 'Popular Restaurants'
                      ? navigation.navigate(Screens.PopularRestaurant)
                      : navigation.navigate(Screens.PastOrder);
                  }}
                  name={item?.name}
                />
              )}
            </>
          );
        }}
        contentContainerStyle={styles.flatListContainer}
        // keyExtractor={() => uuidv4()}
        showsVerticalScrollIndicator={false}
      />
    </Frame>
  );
};

export default HomeScreen;
