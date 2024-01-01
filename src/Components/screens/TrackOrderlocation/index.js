import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState, useEffect, useCallback, useRef} from 'react';
import Frame from '../../common/core/Frame';
import styles from './styles';
import Images from '../../../assets/images';
import Watch from '../../../assets/svg/Watch.svg';
import Messegs from '../../../assets/svg/Messegs.svg';
import {getPlaceName} from '../../../../utils/globalMethods';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker} from 'react-native-maps';
import MarkerIcon from '../../../assets/svg/LocationMarker.js';
import Call from '../../../assets/svg/Call.svg';
import Back from '../../../assets/svg/ChevronBack.svg';
import {scale} from '../../../../utils/scale';
import OrderStatus from '../../common/others/OrderStatus/OrderStatus';
import theme from '../../../themes/theme';
import {Strings} from '../../../constants/Strings';

const TrackOrderlocation = ({navigation}) => {
  const mapViewRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentLocationName, setCurrentLocationName] = useState('');
  const [formattedLocation, setFormattedLocation] = useState({});
  const [markerLocation, setMarkerLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

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
  const reverseGeocode = async (latitude, longitude) => {
    const placeName = await getPlaceName(latitude, longitude);
    if (placeName) {
      setFormattedLocation(placeName?.extractedData);
      setCurrentLocationName(placeName?.placeName);
    }
  };

  const MapMarker = () => (
    <View style={styles.mapMarkerOuterBg}>
      <View style={styles.mapMarkerInnerBg}>
        <MarkerIcon height={32} width={32} />
      </View>
    </View>
  );
  const handlePoiClick = e => {
    setMarkerLocation(e.nativeEvent.coordinate);
    reverseGeocode(
      e.nativeEvent.coordinate.latitude,
      e.nativeEvent.coordinate.longitude,
    );
  };

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    if (currentLocation) {
      setMarkerLocation({
        latitude: currentLocation?.latitude,
        longitude: currentLocation?.longitude,
      });
    }
  }, [currentLocation]);
  return (
    <View style={{flex: 1, backgroundColor: '#FEFEFF'}}>
      <View style={{height: '50%'}}>
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
              }}></Marker>
          )}
        </MapView>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.btnicon}
            onPress={() => navigation.goBack()}>
            <Back />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.bottomContainer}>
        <Text style={styles.timehead}>{'Delivery time'}</Text>
        <View style={styles.timeView}>
          <Watch />
          <Text style={styles.timetxt}>{'20 Min'}</Text>
        </View>
        <View style={styles.customermain}>
          <Image source={Images.photoProfile} style={styles.prfimg} />
          <View style={{justifyContent: 'center', width: '80%'}}>
            <View style={styles.customerCon}>
              <Text style={styles.cutomername}>{'George William'}</Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity>
                  <Call />
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: scale(20)}}>
                  <Messegs />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.numView}>
              <Text style={styles.delvtxt}>{Strings.deliverPerson}</Text>
              <Text style={styles.numtxt}>{'+9213456789'}</Text>
            </View>
          </View>
        </View>
        <OrderStatus
          tick
          btnStyles={{backgroundColor: '#47B782'}}
          Statusheading={Strings.orderConfirm}
          Statusdsc={Strings.confirm}
        />
        <OrderStatus
          tick
          btnStyles={{backgroundColor: '#47B782'}}
          Statusheading={Strings.orderPrepare}
          Statusdsc={Strings.prepared}
        />
        <OrderStatus
          btnStyles={{backgroundColor: theme.palette.PrimaryDeep}}
          Statusheading={Strings.DeliverStatus}
          Statusdsc={Strings.orderWay}
        />
      </ScrollView>

      {/* </Frame> */}
    </View>
  );
};

export default TrackOrderlocation;
