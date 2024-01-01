import React, {
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import {useNavigation, useIsFocused, useRoute} from '@react-navigation/native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import PropTypes from 'prop-types';

//* Icons
import Back from '../../../../assets/svg/ChevronBack.svg';
import Menu from '../../../../assets/svg/MainMenuIcon.svg';
import ChevronDown from '../../../../assets/svg/ChevronDownGray.svg';
import Close from '../../../../assets/svg/CloseRed.svg';
//* Bottom Tab ICONS
import Explore from '../../../../assets/svg/BottomTabIcons/PathIcon.js';
import Heart from '../../../../assets/svg/BottomTabIcons/HeartIcon.js';
import Cart from '../../../../assets/svg/BottomTabIcons/HandBagIcon.js';
import Location from '../../../../assets/svg/BottomTabIcons/LocationIcon.js';
import Notifications from '../../../../assets/svg/BottomTabIcons/BellIcon.js';

//* Others
import theme from '../../../../themes/theme';
import {scale} from '../../../../../utils/scale';
import {Screens} from '../../../../constants/constants';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Txt from '../Txt';

//* Bottom Tab Routes
import {
  NOTIFICATIONS_ROUTE,
  LIKED_ROUTE,
  CART_ROUTE,
  LOCATION_ROUTE,
  EXPLORE_ROUTE,
} from '../../../../constants/constants';
import MenuLink from '../menulink/MenuLink';
import {Strings} from '../../../../constants/Strings';
import {useSelector} from 'react-redux';
import Images from '../../../../assets/images';

const LINKS = [
  {to: Screens.Dummy, icon: Explore, activeIcon: Explore},
  {to: Screens.Login, icon: Location, activeIcon: Location},
  {to: Screens.SignUp, icon: Cart, activeIcon: Cart},
  {to: Screens.ForgotPassword, icon: Heart, activeIcon: Heart},
  {
    to: Screens.PhoneRegistration,
    icon: Notifications,
    activeIcon: Notifications,
  },
];

const Frame = forwardRef(
  (
    {
      onPress,
      children,
      Deliver,
      mode,
      headerVariant,
      headerStyle,
      style,
      containerStyle,
      showBottomSheet,
      snapPoints,
      bottomSheetContent,
      enablePanDownToClose,
      bottomSheetProps,
      customBackDrop,
      backDropComp,
      screenTitle,
      hideBack,
      restrictBack,
      customNavigation,
      ...props
    },
    ref,
  ) => {
    const profileImage = useSelector(
      state => state?.profileInfo?.data?.data?.image_url,
    );

    useEffect(() => {
      setprofile(profileImage);
    }, [profileImage]);
    const [canGoBack, setCanGoBack] = useState(true);
    const [profile, setprofile] = useState(null);

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const {name: ScreenName} = useRoute();

    //* Screen Navigator
    const handleBackPress = () => {
      if (customNavigation && customNavigation.screen) {
        // Navigate to the defined path if customNavigation prop is provided
        navigation.navigate(customNavigation.screen);
      } else if (canGoBack) {
        // Otherwise, go back using the goBack() function
        navigation.goBack();
      }
    };

    //* Restrict User To Go Back (Module)
    useEffect(() => {
      const backAction = () => {
        if (restrictBack) {
          return true; // Prevent navigating back
        }
        return false; // Allow navigating back
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      // Update the canGoBack state based on restrictBack value
      setCanGoBack(!restrictBack);

      return () => backHandler.remove();
    }, [restrictBack]);

    //* On IOS (Restrict User to GoBack() if restrictBack: True)
    useEffect(() => {
      if (restrictBack) {
        navigation.setOptions({
          gestureEnabled: false,
          gestureDirection: 'horizontal',
        });
      } else {
        navigation.setOptions({
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        });
      }
    }, [restrictBack, navigation]);

    //* Bottom Sheet Logic
    const bottomSheetRef = useRef(null);
    const renderBackdropBottomSheet = useCallback(
      props => (
        <BottomSheetBackdrop
          BackdropPressBehavior={'close'}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          {...props}
        />
      ),
      [],
    );
    //* Listen Bottom Sheet Event From Parent
    useImperativeHandle(ref, () => ({
      expandBottomSheet: () => {
        if (bottomSheetRef.current) {
          bottomSheetRef.current.snapToIndex(0);
        }
      },
      closeBottomSheet: () => {
        if (bottomSheetRef.current) {
          bottomSheetRef.current.close();
        }
      },
    }));

    //* Main View Mode: (View || ScrollView)
    const content =
      mode === 'scroll' ? (
        <GestureHandlerRootView style={{flex: 1}}>
          <ScrollView
            style={[styles().container, style]}
            contentContainerStyle={[styles().contentContainer, containerStyle]}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
          {showBottomSheet && (
            <BottomSheet
              ref={bottomSheetRef}
              snapPoints={snapPoints}
              index={-1}
              enablePanDownToClose={enablePanDownToClose}
              enabledInnerScrolling={true}
              backdropComponent={
                customBackDrop ? backDropComp : renderBackdropBottomSheet
              }
              backgroundStyle={styles().btmBg}
              handleIndicatorStyle={styles().btmIndicator}
              {...bottomSheetProps}>
              {bottomSheetContent}
            </BottomSheet>
          )}
        </GestureHandlerRootView>
      ) : (
        <GestureHandlerRootView style={styles().defFlexOne}>
          <View style={[styles().container, style]}>{children}</View>
          {showBottomSheet && (
            <BottomSheet
              ref={bottomSheetRef}
              snapPoints={snapPoints}
              index={-1}
              enablePanDownToClose={enablePanDownToClose}
              enabledInnerScrolling={true}
              backdropComponent={
                customBackDrop ? backDropComp : renderBackdropBottomSheet
              }
              backgroundStyle={styles().btmBg}
              handleIndicatorStyle={styles().btmIndicator}
              {...bottomSheetProps}>
              {bottomSheetContent}
            </BottomSheet>
          )}
        </GestureHandlerRootView>
      );

    //* Return Header Based on Passed Variant
    const Header = variant => {
      switch (variant) {
        case 'blank':
          return null;
        case 'v1':
          return (
            <View
              style={[
                styles().headerContainer,
                styles().defAlignmentWithSpBtw,
              ]}>
              {hideBack ? (
                <View />
              ) : (
                <TouchableOpacity
                  style={styles().iconBg}
                  onPress={handleBackPress}>
                  <Back />
                </TouchableOpacity>
              )}
              <Txt numberOfLines={1} style={styles().screenName}>
                {screenTitle !== '' ? screenTitle : ScreenName}
              </Txt>
              <View style={styles().empty}></View>
            </View>
          );
        case 'v2':
          return (
            <View
              style={[
                styles().headerContainer,
                styles().defAlignmentWithSpBtw,
                headerStyle,
              ]}>
              {hideBack ? (
                <View />
              ) : (
                <TouchableOpacity
                  style={styles().iconBg}
                  onPress={handleBackPress}>
                  <Back />
                </TouchableOpacity>
              )}
            </View>
          );
        case 'v3':
          return (
            <View
              style={[
                styles().headerContainer,
                styles().defAlignmentWithSpBtw,
              ]}>
              <TouchableOpacity
                style={[
                  styles().iconBg,
                  {paddingVertical: theme.spacing.padding.p2},
                ]}
                onPress={() => {
                  navigation.navigate(Screens.MainMenu);
                }}>
                <Menu height={scale(14)} width={scale(18, true)} />
              </TouchableOpacity>
              <View style={styles().locationContainer}>
                <TouchableOpacity
                  onPress={onPress}
                  style={styles().defAlignmentRow}>
                  <Txt style={styles().deliverTo}>{Strings.deliverTo}</Txt>
                  <ChevronDown />
                </TouchableOpacity>
                <Txt numberOfLines={1} style={styles().address}>
                  {screenTitle}
                </Txt>
              </View>
              <TouchableOpacity style={styles().profileImageContainer}>
                {profile ? (
                  <Image
                    source={{
                      uri: profile,
                    }}
                    style={styles().profileImage}
                  />
                ) : (
                  <View style={styles().profileImageContent}>
                    <Image
                      source={Images.user}
                      style={styles().profileImageIcons}
                    />
                  </View>
                  // <Image
                  //   source={{
                  //     uri: 'https://images.unsplash.com/photo-1484774374809-69b9da12d46e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
                  //   }}
                  //   style={styles().profileImage}
                  // />
                )}
              </TouchableOpacity>
            </View>
          );
        case 'v4':
          return (
            <View
              style={[
                styles().headerContainer,
                styles().defAlignmentWithSpBtw,
              ]}>
              <TouchableOpacity
                style={[
                  styles().iconBg,
                  {paddingVertical: theme.spacing.padding.p2},
                ]}
                onPress={() => navigation.goBack()}>
                <Close />
              </TouchableOpacity>
              <Txt numberOfLines={1} style={styles().screenName}>
                {screenTitle !== '' ? screenTitle : ScreenName}
              </Txt>
              <View style={styles().empty}></View>
            </View>
          );
        case 'v5':
          return (
            <View
              style={[
                styles().headerContainer,
                styles().defAlignmentWithSpBtw,
              ]}>
              {hideBack ? (
                <View />
              ) : (
                <TouchableOpacity
                  style={styles().iconBg}
                  onPress={handleBackPress}>
                  <Back />
                </TouchableOpacity>
              )}
              {Deliver ? (
                <View style={styles().locationContainer}>
                  <TouchableOpacity
                    onPress={onPress}
                    style={styles().defAlignmentRow}>
                    <Txt style={styles().deliverTo}>{Strings.deliverTo}</Txt>
                    <ChevronDown />
                  </TouchableOpacity>
                  <Txt numberOfLines={1} style={styles().address}>
                    {screenTitle}
                  </Txt>
                </View>
              ) : null}
              <View style={styles().empty}></View>
            </View>
          );
        default:
          return (
            <View
              style={[
                styles().headerContainer,
                styles().defAlignmentWithSpBtw,
              ]}>
              {hideBack ? (
                <View />
              ) : (
                <TouchableOpacity
                  style={styles().iconBg}
                  onPress={handleBackPress}>
                  <Back />
                </TouchableOpacity>
              )}
              <Txt numberOfLines={1} style={styles().screenName}>
                {screenTitle !== '' ? screenTitle : ScreenName}
              </Txt>
              <View style={styles().empty}></View>
            </View>
          );
      }
    };

    return (
      isFocused && (
        <SafeAreaView style={styles().superContainer}>
          <View style={styles().topBar}>{Header(headerVariant)}</View>
          <View style={{flex: 1}}>{content}</View>
          {/* <View style={[styles().nav]}>
          {LINKS.map((l, i) => (
            <MenuLink
              key={i}
              to={{screen: l.to}}
              Icon={l.icon}
              ActiveIcon={l.activeIcon}
            />
          ))}
        </View> */}
        </SafeAreaView>
      )
    );
  },
);

export const styles = () => {
  let style = {
    //* Default
    //TODO Move him to Global
    defAlignmentWithSpBtw: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    defAlignmentRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    defFlexOne: {
      flex: 1,
    },
    //* Containers
    superContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: theme.palette.white,
    },
    contentContainer: {flexGrow: 1},
    //* Headers
    headerContainer: {
      paddingHorizontal: theme.spacing.padding.p1,
      paddingTop: theme.spacing.padding.p1,
      paddingBottom: theme.spacing.padding.p4,
      backgroundColor: theme.palette.white,
    },
    iconBg: {
      backgroundColor: theme.palette.white,
      paddingHorizontal: theme.spacing.padding.p2,
      paddingVertical: theme.spacing.padding.p3,
      borderRadius: theme.radius.r2,

      //* Shadow
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.19,
      shadowRadius: 5.62,
      elevation: 6,
    },
    screenName: {
      color: theme.palette.TypographyDeep,
      // maxWidth: '52.5%',
      textAlign: 'center',
      ...theme.typography.common.h1a,
    },
    empty: {
      height: scale(38),
      width: scale(38, true),
    },
    locationContainer: {
      alignItems: 'center',
    },
    deliverTo: {
      textAlign: 'center',
      marginRight: theme.spacing.margin.m6,
      color: theme.palette.GrayDeep,
      ...theme.typography.common.h3sb,
    },
    address: {
      textAlign: 'center',
      maxWidth: '72%',
      marginRight: theme.spacing.margin.m6,
      color: theme.palette.PrimaryDeep,
      ...theme.typography.common.h3sb,
    },
    profileImageContainer: {},
    profileImage: {
      height: scale(40),
      width: scale(40, true),
      borderRadius: theme.radius.r2,
      borderWidth: scale(0.5),
    },
    profileImageContent: {
      height: scale(40),
      width: scale(40, true),
      borderRadius: theme.radius.r2,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: scale(0.5),
      borderColor: theme.palette.Gray,
    },
    profileImageIcons: {
      height: scale(30),
      width: scale(30, true),
      borderRadius: theme.radius.r2,
      tintColor: theme.palette.PrimaryDeep,
    },
    //* Bottom Tab Navigation
    nav: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: scale(20, true),
      paddingVertical: scale(12),
      backgroundColor: theme.palette.white,
      borderTopLeftRadius: theme.radius.r2,
      borderTopRightRadius: theme.radius.r2,

      //* Shadow
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: -5, // Negative value to move the shadow towards the top
      },
      shadowOpacity: 0.24,
      shadowRadius: 4,
      elevation: 8, // This property is specific to Android
    },

    //* Bottom Sheet
    btmIndicator: {
      backgroundColor: theme.palette.GrayLight,
      width: scale(64, true),
      height: scale(6),
    },
    btmBg: {
      backgroundColor: theme.palette.white,
    },
  };

  return StyleSheet.create(style);
};

Frame.propTypes = {
  children: PropTypes.node,
  mode: PropTypes.oneOf(['view', 'scroll']),
  headerVariant: PropTypes.oneOf(['v1', 'v2', 'v3', 'v4', 'blank']),
  bottomLogo: PropTypes.bool,
  customBackDrop: PropTypes.bool,
  screenTitle: PropTypes.string,
  enablePanDownToClose: PropTypes.bool,
  snapPoints: PropTypes.array,
  showBottomSheet: PropTypes.bool,
  bottomSheetContent: PropTypes.element,
  backDropComp: PropTypes.elementType,
  customNavigation: PropTypes.object,
  restrictBack: PropTypes.bool,
};

Frame.defaultProps = {
  mode: 'scroll',
  headerVariant: 'v1',
  customBackDrop: false,
  screenTitle: '',
  enablePanDownToClose: true,
  snapPoints: [],
  showBottomSheet: false,
  restrictBack: false,
  hideBack: false,
};

export default Frame;

//* Documentation
/**

Frame is a custom component that provides a container with header, content, and optional bottom logo.
@param {object} props - The component props.
@param {node} props.children - The content to render inside the Frame component.
@param {string} [props.mode='ScrollView'] - The main view mode of the Frame component. It can be 'View' or 'ScrollView'.
@param {string} [props.headerVariant='v1'] - The variant of the header to display. Possible values are 'v1', 'v2', 'v3', 'v4', or 'blank'.
@param {boolean} [props.bottomLogo=false] - Determines whether to display the bottom logo or not.
@param {object} [props.style] - The style object to apply to the Frame component.
@param {object} [props.containerStyle] - The style object to apply to the content container.
@param {boolean} [props.showBottomSheet] - Determines whether to show the bottom sheet or not.
@param {array} [props.snapPoints] - The array of snap points for the bottom sheet.
@param {node} [props.bottomSheetContent] - The content to render inside the bottom sheet.
@param {boolean} [props.enablePanDownToClose] - Determines whether to enable pan down to close the bottom sheet.
@param {object} [props.bottomSheetProps] - Additional props to pass to the bottom sheet component.
@param {boolean} [props.customBackDrop] - Determines whether to use a custom backdrop component for the bottom sheet or not.
@param {node} [props.backDropComp] - The custom backdrop component to render for the bottom sheet.
@param {string} [props.screenTitle=''] - The title of the screen to display in the header.
@property {boolean} [hideBack] - Flag indicating whether the back button should be hidden in the header.
@property {boolean} [restrictBack] - Flag indicating whether the back button should be restricted and only navigate within the current screen stack.
@property {object} [customNavigation] - Custom navigation configuration for the back button.
@property {string} customNavigation.screen - The screen to navigate when the back button is pressed.

@return {JSX.Element|null} - The rendered Frame component.
*/
