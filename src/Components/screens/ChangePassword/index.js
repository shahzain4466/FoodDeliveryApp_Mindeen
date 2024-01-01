import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import Frame from '../../common/core/Frame';
import CustomTouchableOpacity from '../../common/core/touchableopacity/CustomTouchableOpacity';
import { pickImage } from '../../../../utils/globalMethods';
import Camera from '../../../assets/svg/Camera.svg';
import Txt from '../../common/core/Txt';
import { Strings } from '../../../constants/Strings';
import Button from '../../common/core/Button';
import styles from './styles';
import { validatePassword } from '../../../../utils/globalMethods';
import Input from '../../common/core/Input';
import Botton from '../../common/core/Button';
import { ChangeUserPassword } from '../../../redux/action/ChangeUserPassword';
import { useDispatch, useSelector } from 'react-redux';
import SuccessTick from '../../../assets/svg/SuccessTick.svg';
import theme from '../../../themes/theme';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.userData.isAuthenticated);
  const changedPassword = useSelector(state => state.editPassword);
  const [showSecondBtm, setShowSecondBtm] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [errorState, setError] = useState({ status: false, msg: '' });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confrimPassword, setConfirmPassword] = useState('');
  const [disableVerify, setDisableVerify] = useState(true);
  const [isStrongPassword, setIsStrongPassword] = useState(false);
  const deletedBtm = useRef(null);
  const snapPointDeleteBtm = useMemo(() => ['35%'], []);
  const {
    data: getChangedPassword,
    loading: changPasswordLoading,
    error: changePasswordError,
  } = useMemo(() => changedPassword, [changedPassword]);

  const isFirstRender = useRef(true);

  useEffect(() => {
    // Check if it's not the initial render
    if (!isFirstRender.current) {
      if (changPasswordLoading) {
        console.log('loading State:-------->', changPasswordLoading);
        setError({ status: false, msg: '' });
      } else if (changePasswordError) {
        console.log('error State:-------->', changePasswordError);
        const { message, success } = changePasswordError;
        setError({ status: !success, msg: message });
      } else if (getChangedPassword) {
        console.log('Data:-', getChangedPassword);
        if (getChangedPassword?.success) {
          deletedBtm.current?.expandBottomSheet();
        }
        setError({ status: false, msg: '' });
      }
    } else {
      isFirstRender.current = false;
    }
  }, [getChangedPassword, changePasswordError, changPasswordLoading]);
  useEffect(() => {
    if (currentPassword && newPassword && confrimPassword  && newPassword ===confrimPassword ) {
      setDisableVerify(false);
    } else {
      setDisableVerify(true);
    }
  }, [currentPassword, newPassword, confrimPassword]);

  useEffect(() => {
    const validate = validatePassword(newPassword)
    if (validate) {
      setIsStrongPassword(true)
    } else {
      setIsStrongPassword(false)
    }
  }, [newPassword])
  useEffect(() => {
    const validate = validatePassword(newPassword)
    if (newPassword==confrimPassword){
      setConfirm(false)
    } else{
      setConfirm(true)
    }
  }, [confrimPassword])
  const onUpdatePress = () => {
    dispatch(
      ChangeUserPassword(currentPassword, newPassword, confrimPassword, token),
    );
  };
  const locationDeletedBtm = (
    <View style={styles.btmContainer}>
      <View style={styles.successTickIconContainer}>
        <SuccessTick />
      </View>
      <Txt
        style={[styles.delBtmTitle, { marginVertical: theme.spacing.margin.m1 }]}>
        {Strings.passwordUpadted}
      </Txt>
      <Button
        title={Strings.locBtnBtmOneTitle}
        onPress={() => {
          setCurrentPassword('')
          setConfirmPassword('')
          setNewPassword('')
          deletedBtm.current?.closeBottomSheet();
          setShowSecondBtm(false);
        }}
      />
    </View>
  );

  return (
    <Frame
      ref={deletedBtm}
      bottomSheetContent={locationDeletedBtm}
      snapPoints={snapPointDeleteBtm}
      showBottomSheet={true}
      containerStyle={styles.defSpBtw}
      style={styles.container}
      screenTitle={'Change Password'}
      headerVariant={'v1'}>
      <Input
        inputType={'password'}
        value={currentPassword}
        onChangeText={text => {
          setCurrentPassword(text);
          setError({ status: false, msg: '' });
        }}
        hideTag={false}
        Tag={Strings.currentPassword}
        error={errorState.status}
        errorDetail={errorState.msg}
        TagStyling={styles.tag}
        placeholder={Strings.currentPassword}
      // ContentContainerStyle={styles.input}
      />
      <Input
        inputType={'password'}
        value={newPassword}
        onChangeText={text => setNewPassword(text)}
        hideTag={false}
        Tag={Strings.newPassword}
        error={newPassword.length>0?!isStrongPassword:false}
        errorDetail={isStrongPassword
          ? null
          : Strings.caPassIndicatorWrong}
        TagStyling={styles.tag}
        placeholder={Strings.newPassword}
      />
    

      <Input
        inputType={'password'}
        value={confrimPassword}
        onChangeText={text => {
          setConfirmPassword(text);
          setError({ status: false, msg: '' });
        }}
        hideTag={false}
        Tag={Strings.confirmPassword}
        error={confrimPassword.length>0?confirm:false}
        errorDetail={newPassword==confrimPassword?null:Strings.matchPassword}
        TagStyling={styles.tag}
        placeholder={Strings.confirmPassword}
      // ContentContainerStyle={styles.input}
      />



      <Botton
        disabled={disableVerify}
        title={Strings.updatePassword}
        singleButtonStyle={styles.btn}
        onPress={() => onUpdatePress()}
      />
    </Frame>
  );
};

export default ChangePassword;
