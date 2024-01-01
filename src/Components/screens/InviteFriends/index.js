import { View, Text, Image, Alert, Share } from 'react-native'
import React, { useState } from 'react'
import Frame from '../../common/core/Frame'
import styles from './styles'
import Botton from '../../common/core/Button'
import { Screens } from '../../../constants/constants'
import { Strings } from '../../../constants/Strings'
import theme from '../../../themes/theme'
import { scale } from '../../../../utils/scale'
import Images from '../../../assets/images'

const InviteFreinds = () => {

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: Strings.AppTitle,
        message: Strings.linkMessage,
        url: Strings.inviteUrl
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert(error.message);
    }
  };
  return (
    <Frame
      style={styles.container}
      mode={'view'}
      customNavigation={{ screen: Screens.MainMenu }}
    >
      <Image
        source={Images.Invite}
        style={styles.invitepic}
      />
      <View style={styles.invitehead}>
        <Text style={styles.Inviteheading1}>{Strings.Inviteheading1}<Text style={styles.Inviteheading2}>{Strings.Inviteheading2}</Text></Text>
      </View>
      <View>
        <Text style={styles.InviteDesc}>{Strings.InviteDesc}</Text>
      </View>
      <Botton
        titleStyle={styles.btntxt}
        title={Strings.snSharelinkBtn}
        singleButtonStyle={styles.btn}
        onPress={() => onShare()}
      />
    </Frame>
  )
}

export default InviteFreinds