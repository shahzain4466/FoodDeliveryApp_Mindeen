import {View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, useMemo, useRef} from 'react';
import Frame from '../../common/core/Frame';
import theme from '../../../themes/theme';
import {pickImage, pickImageCamera} from '../../../../utils/globalMethods';
import Camera from '../../../assets/svg/Camera.svg';
import Txt from '../../common/core/Txt';
import {Strings} from '../../../constants/Strings';
import Button from '../../common/core/Button';
import styles from './styles';
import Input from '../../common/core/Input';
import {useDispatch, useSelector} from 'react-redux';
import Botton from '../../common/core/Button';
import {Screens} from '../../../constants/constants';
import {EditProfile} from '../../../redux/action/EditProfile';
import {GetProfileInfo} from '../../../redux/action/GetProfileInfo';
import SuccessTick from '../../../assets/svg/SuccessTick.svg';
import Images from '../../../assets/images';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.userData.isAuthenticated);
  const profileData = useSelector(state => state.profileInfo.data);

  const editprofile = useSelector(state => state.editProfile);

  const [image_url, setSelectedImage] = useState(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [disableVerify, setDisableVerify] = useState(true);
  const [errorState, setError] = useState({status: false, msg: ''});
  const [showSecondBtm, setShowSecondBtm] = useState(false);
  const deletedBtm = useRef(null);
  const snapPointDeleteBtm = useMemo(() => ['37%'], []);
  const {
    data: getEditProfileData,
    loading: editProfileLoading,
    error: editProfileError,
  } = useMemo(() => editprofile, [editprofile]);

  useEffect(() => {
    if (editProfileLoading) {
      setError({status: false, msg: ''});
    } else if (editProfileError) {
      const {message, success} = editProfileError;
      setError({status: !success, msg: message});
    } else if (getEditProfileData) {
      if (getEditProfileData?.success) {
        setShowSecondBtm(true);
        dispatch(GetProfileInfo(token));
        console.log('token', token);
        setTimeout(() => {
          deletedBtm.current?.expandBottomSheet();
        }, 300);
      }
      setError({status: false, msg: ''});
    }
  }, [getEditProfileData, editProfileLoading, editProfileError]);

  useEffect(() => {
    if (email && phoneNumber && fullName && image_url && gender) {
      setDisableVerify(false);
    } else {
      setDisableVerify(true);
    }
  }, [phoneNumber, fullName, email, gender, image_url]);

  useEffect(() => {
    setPhoneNumber(profileData?.data?.contactNumber);
    setEmail(profileData?.data?.email);
    setFullName(profileData?.data?.fullName);
    setSelectedImage(profileData?.data?.image_url);
    setGender(profileData?.data?.gender);
  }, [profileData]);
  console.log('image_url', image_url);

  const onSaveChangePress = () => {
    dispatch(EditProfile(email, fullName, gender, image_url, token));
  };

  const locationDeletedBtm = (
    <View style={styles.btmContainer}>
      <View style={styles.successTickIconContainer}>
        <SuccessTick />
      </View>
      <Txt
        style={[styles.delBtmTitle, {marginVertical: theme.spacing.margin.m1}]}>
        {Strings.profileUpdated}
      </Txt>
      <Button
        title={Strings.locBtnBtmOneTitle}
        singleButtonStyle={styles.closebtn}
        onPress={() => {
          deletedBtm.current?.closeBottomSheet();
        }}
      />
    </View>
  );

  const optionBtm = useRef(null);
  const snapPointoptionBtm = useMemo(() => ['33%'], []);
  const chooseoptionBtm = (
    <View style={styles.btmContainer}>
      <Txt
        style={[styles.delBtmTitle, {marginVertical: theme.spacing.margin.m7}]}>
        {Strings.chooseOptions}
      </Txt>
      <View style={styles.picContainer}>
        <TouchableOpacity onPress={() => showLibrary()}>
          <Image
            source={Images.FromGallary}
            style={styles.img}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showCamera()}>
          <Image
            source={Images.Cameralogo}
            style={styles.img}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  const showLibrary = () => {
    pickImage()
      .then(res => {
        console.log(res);
        setSelectedImage(res.uri);
        setShowSecondBtm(false);
        optionBtm.current?.closeBottomSheet();
      })
      .catch(error => {
        console.warn('Error Ocurred While Selecting Image: ', error);
      });
  };
  const showCamera = () => {
    pickImageCamera()
      .then(res => {
        console.log(res);
        setSelectedImage(res.uri);
        setShowSecondBtm(false);
        optionBtm.current?.closeBottomSheet();
      })
      .catch(error => {
        console.warn('Error Ocurred While Selecting Image: ', error);
      });
  };

  return (
    <Frame
      ref={showSecondBtm ? deletedBtm : optionBtm}
      bottomSheetContent={showSecondBtm ? locationDeletedBtm : chooseoptionBtm}
      snapPoints={showSecondBtm ? snapPointDeleteBtm : snapPointoptionBtm}
      showBottomSheet={true}
      enablePanDownToClose={true}
      containerStyle={styles.defSpBtw}
      style={styles.container}
      screenTitle={Strings.PscreenTitle}
      headerVariant={'v4'}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            setShowSecondBtm(false);
            setTimeout(() => {
              optionBtm.current?.expandBottomSheet();
            }, 300);
          }}
          style={styles.imageContainer}>
          <View style={styles.camIconBg}>
            <Camera />
          </View>
          {image_url ? (
            <Image source={{uri: image_url}} style={styles.image} />
          ) : (
            <Image
              source={Images.user}
              style={styles.image}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      </View>
      <Input
        value={fullName}
        onChangeText={text => {
          setFullName(text);
          setError({status: false, msg: ''});
        }}
        hideTag={false}
        Tag={Strings.epFullName}
        error={errorState.status}
        errorDetail={errorState.msg}
        TagStyling={styles.tag}
        placeholder={Strings.epFullName}
      />
      <Input
        // editable={false}
        value={email}
        onChangeText={text => {
          setEmail(text);
          setError({status: false, msg: ''});
        }}
        hideTag={false}
        Tag={Strings.epEmail}
        error={errorState.status}
        errorDetail={errorState.msg}
        TagStyling={styles.tag}
        placeholder={Strings.epEmail}
        ContentContainerStyle={styles.input}
      />
      <Input
        value={phoneNumber}
        onChangeText={text => {
          setPhoneNumber(text);
          setError({status: false, msg: ''});
        }}
        hideTag={false}
        Tag={Strings.epPhoneNumber}
        error={errorState.status}
        errorDetail={errorState.msg}
        TagStyling={styles.tag}
        placeholder={Strings.epPhoneNumber}
        editable={false}
      />
      <Input
        inputType={'btn'}
        editable={false}
        value={'***********'}
        hideTag={false}
        Tag={Strings.epPassword}
        TagStyling={styles.tag}
        placeholder={Strings.epPassword}
        onPress={() => navigation.navigate(Screens.ChangePassword)}
      />
      <Botton
        disabled={disableVerify}
        title={Strings.saveChange}
        singleButtonStyle={styles.btn}
        onPress={() => onSaveChangePress()}
      />
    </Frame>
  );
};

export default ProfileScreen;
