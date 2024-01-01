import { View, Text, Image } from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import Frame from '../../common/core/Frame'
import styles from './styles'
import Botton from '../../common/core/Button'
import { Screens } from '../../../constants/constants'
import { Strings } from '../../../constants/Strings'
import NotificationSetting from '../../common/others/NotificationSetting/NotificationSetting'
import AddBtn from '../../common/others/AddBtn/AddBtn'
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { GetAppSetting } from '../../../redux/action/GetAppSetting'
import { EditAppSetting } from '../../../redux/action/EditAppSetting'
const SettingScreen = () => {

  const [emailNotifications, setEmailNotifications] = useState(false)
  const [mobileNotifications, setmobileNotifications] = useState(false)
  const [smsNotifications, setsmsNotifications] = useState(false)
  const [darkMode, setdarkMode] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const Appsettings = useSelector(state => state?.getAppSettings)
  console.log('abc-=', Appsettings)
  const { token } = useSelector(state => state?.userData?.isAuthenticated);
  const EditSetting = useSelector(state => state?.editSetting)

  useEffect(() => {
    // setIsUpdated(false)
    dispatch(GetAppSetting(token))
  }, [isFocused])


  const [errorState, setError] = useState({ status: false, msg: '' });


  const changeTheme = (nextObject) => {
    setIsUpdated(true)
    const cB = {
      emailNotifications: emailNotifications,
      smsNotifications: smsNotifications,
      mobileNotifications: mobileNotifications,
      darkMode: darkMode,
      ...nextObject
    }
    dispatch(EditAppSetting(cB.emailNotifications, cB.smsNotifications, cB.mobileNotifications, cB.darkMode, token))
  }



  const {
    data: getEditSetting,
    loading: loadingEditSetting,
    error: errorEditSetting,
  } = useMemo(() => EditSetting, [EditSetting]);

  useEffect(() => {
    if (loadingEditSetting) {
      setError({ status: false, msg: '' });
    } else if (errorEditSetting) {
      setError({ status: false, msg: '' });
    } else if (getEditSetting) {
      console.log('getEditSetting=<>', getEditSetting);
      if (getEditSetting?.success === true) {
        dispatch(GetAppSetting(token))
      }
      setError({ status: false, msg: '' });
    }
  }, [getEditSetting, loadingEditSetting, errorEditSetting]);

  const {
    data: getAppsettings,
    loading: loadingAppsettings,
    error: errorAppsettings,
  } = useMemo(() => Appsettings, [Appsettings]);

  useEffect(() => {
    if (isUpdated) return
    if (loadingAppsettings) {
      setError({ status: false, msg: '' });
    } else if (errorAppsettings) {
      setError({ status: '', msg: '' });
    } else if (getAppsettings) {
      console.log('testing112344');
      console.log('value of the',isUpdated);
      setEmailNotifications(getAppsettings?.data?.emailNotifications);
      setsmsNotifications(getAppsettings?.data?.smsNotifications);
      setmobileNotifications(getAppsettings?.data?.mobileNotifications);
      setdarkMode(getAppsettings?.data?.darkMode);
      // setError({ status: false, msg: '' });
    }

  }, [getAppsettings, loadingAppsettings, errorAppsettings]);



  return (
    <Frame
      style={styles.container}
      mode={'view'}
      customNavigation={{ screen: Screens.MainMenu }}
    >
      <View style={styles.subcontainer}>
        <NotificationSetting
          titletxt={Strings.EmailNotification}
          desctxt={Strings.subtxtEmail}
          themeStatus={emailNotifications}
          btn
          onPress={() => {
            const nextStatus = !emailNotifications
            changeTheme({ emailNotifications: nextStatus })
            setEmailNotifications(nextStatus)
          }}
        />
        <NotificationSetting
          themeStatus={mobileNotifications}
          titletxt={Strings.MobileNotification}
          desctxt={Strings.subtxtMobile}
          btn={true}
          onPress={() => {
            const nextStatus = !mobileNotifications
            changeTheme({ mobileNotifications: nextStatus })
            setmobileNotifications(nextStatus)
          }} />
        <NotificationSetting
          titletxt={Strings.SmsNotification}
          desctxt={Strings.subtxtsms}
          themeStatus={smsNotifications}
          btn={true}
          onPress={() => {
            const nextStatus = !smsNotifications
            changeTheme({ smsNotifications: nextStatus })
            setsmsNotifications(nextStatus)
          }} />
      </View>
      <View style={styles.separator}></View>
      <View style={styles.subcontainer1}>
        <NotificationSetting
          titletxt={Strings.darkmodetxt}
          desctxt={Strings.DarkMode}
          themeStatus={darkMode}
          btn={true}
          onPress={() => {
            const nextStatus = !darkMode
            changeTheme({ darkMode: nextStatus })
            setdarkMode(nextStatus)
          }} />
      </View>
      {/* <AddBtn btnStyle={styles.btnStyle} /> */}
    </Frame>
  )
}

export default SettingScreen