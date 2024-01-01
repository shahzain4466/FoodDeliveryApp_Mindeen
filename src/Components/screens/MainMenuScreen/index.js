import {View, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
//* Components
import Txt from '../../common/core/Txt';
import Frame from '../../common/core/Frame';
import CustomTouchableOpacity from '../../common/core/touchableopacity/CustomTouchableOpacity';
//* Icons
import Camera from '../../../assets/svg/Camera.svg';
import ProfileIcon from '../../../assets/svg/MainMenuIcons/ProfileIcon.svg';
import DocumentIcon from '../../../assets/svg/MainMenuIcons/DocumentIcon.svg';
import HelpsIcon from '../../../assets/svg/MainMenuIcons/HelpsIcon.svg';
import LogoutIcon from '../../../assets/svg/MainMenuIcons/LogoutIcon.svg';
import MessageIcon from '../../../assets/svg/MainMenuIcons/MessageIcon.svg';
import SettingIcon from '../../../assets/svg/MainMenuIcons/SettingIcon.svg';
import WalletIcon from '../../../assets/svg/MainMenuIcons/WalletIcon.svg';
import LocationIcon from '../../../assets/svg/MainMenuIcons/LocationIcon.svg';

//* Others
import {Strings} from '../../../constants/Strings';
import {pickImage} from '../../../../utils/globalMethods';
import {cleanUp} from '../../../redux/slices/LocalUserDataSlice';
import {GetProfileInfo} from '../../../redux/action/GetProfileInfo';
import {Screens} from '../../../constants/constants';
import {useIsFocused} from '@react-navigation/native';
import PathIcon from '../../../assets/svg/BottomTabIcons/PathIcon';
import Images from '../../../assets/images';

//* Flat List Data
const menu = [
  {
    icon: ProfileIcon,
    title: Strings.mmProfile,
  },
  {
    icon: DocumentIcon,
    title: Strings.mmOrder,
  },
  {
    icon: LocationIcon,
    title: Strings.mmAddress,
  },
  {
    icon: MessageIcon,
    title: Strings.mmInvite,
  },
  {
    icon: WalletIcon,
    title: Strings.mmPayment,
  },
  {
    icon: HelpsIcon,
    title: Strings.mmHelp,
  },
  {
    icon: SettingIcon,
    title: Strings.mmSetting,
  },
];

const MainMenuScreen = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorState, setError] = useState({status: false, msg: ''});
  const dispatch = useDispatch();
  //* Getting Token From Stored Data
  const {token} = useSelector(state => state.userData.isAuthenticated);
  //? Clear Local Stored Data and Logout
  const handleLogout = () => {
    dispatch(cleanUp());
  };

  //* API Logic (Get Profile Info)
  const profileInfo = useSelector(state => state.profileInfo);
  //* Caching Data
  const {data, loading, error} = useMemo(() => profileInfo, [profileInfo]);
  //* Calling Api

  useEffect(() => {
    if (loading) {
      setError({status: false, msg: ''});
    } else if (error) {
      const {message, success} = error;
      setError({status: !success, msg: message});
    } else if (data) {
      const {
        data: {email, fullName},
      } = data;
      setSelectedImage(data.data.image_url);
      console.log('Data:-', email, fullName);
      setError({status: false, msg: ''});
    }
  }, [data, loading, error]);

  //* Flat List Logic
  //* Header
  const headerComp = (
    <View style={styles.headerContainer}>
      {/* Profile */}
      {/* <TouchableOpacity>
        <Image source={}/>
      </TouchableOpacity> */}
      <CustomTouchableOpacity style={styles.imageContainer} activeOpacity={1}>
        <TouchableOpacity style={styles.camIconBg}>
          <Camera />
        </TouchableOpacity>
        {selectedImage ? (
          // <></>
          <Image
            source={{uri: selectedImage}}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <Image source={Images.user} style={styles.image} />
        )}
      </CustomTouchableOpacity>
      <View style={styles.headingContainer}>
        <Txt style={styles.name}>
          {!loading ? (data ? data.data.fullName : '') : `Loading`}
        </Txt>
        <Txt style={styles.email}>
          {!loading ? (data ? data.data.email : '') : `Loading`}
        </Txt>
      </View>
    </View>
  );

  //* Render Item Component {/* Main Menu (Options) */}
  const renderItem = ({item: {icon: Icon, title}}) => {
    return (
      <CustomTouchableOpacity
        onPress={() => {
          if (title === 'Addresses') {
            navigation.navigate(Screens.LocationsScreen);
          } else if (title === 'My Profile') {
            navigation.navigate(Screens.Profile);
          } else if (title === 'My Orders') {
            navigation.navigate(Screens.MyOrders);
          } else if (title === 'Payment Methods') {
            navigation.navigate(Screens.Payment);
          } else if (title === 'Settings') {
            navigation.navigate(Screens.Settings);
          } else if (title === 'Invite Friends') {
            navigation.navigate(Screens.InviteFriends);
          }
        }}
        style={styles.listItemContainer}>
        <Icon />
        <Txt style={styles.listItemTitle}>{title}</Txt>
      </CustomTouchableOpacity>
    );
  };

  //* Footer (Logout)
  const FooterComp = (
    <CustomTouchableOpacity
      onPress={() => {
        handleLogout();
      }}
      style={styles.footerContainer}>
      <View style={styles.logoutIconBg}>
        <LogoutIcon />
      </View>
      <Txt style={styles.logoutTxt}>{Strings.mmLogout}</Txt>
    </CustomTouchableOpacity>
  );

  return (
    <Frame
      containerStyle={styles.defSpBtw}
      style={styles.container}
      headerVariant={'v4'}
      home>
      <FlatList
        ListHeaderComponent={headerComp}
        ListFooterComponent={FooterComp}
        contentContainerStyle={{flexGrow: 1}}
        ListFooterComponentStyle={styles.footer}
        ListHeaderComponentStyle={styles.header}
        data={menu}
        renderItem={renderItem}
      />
    </Frame>
  );
};

export default MainMenuScreen;
