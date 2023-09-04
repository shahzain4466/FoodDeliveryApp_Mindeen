import Colors from "../../Utiles/Colors";
import { StyleSheet } from 'react-native';
import { PixelRatio } from 'react-native';
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: number) => size / fontScale;

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.White
    },
    headerContainer: {
        alignSelf: 'center',
        borderRadius: 12,
        marginTop: 15
    },
    headerBackground: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 12,
    },
    buttonMainContainer: {
        backgroundColor: Colors.White,
        width: 38,
        height: 38,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heartButtonMainContainer: {
        backgroundColor: Colors.SplashBackgroundColor,
        width: 28,
        height: 28,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonImageStyle: {
        width: 6,
        height: 9.5
    },
    heartButtonImageStyle: {
        width: 13,
        height: 12
    },
    headerButtonsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        position: 'absolute',
        top: 10,
    },
    foodHeadingStyle: {
        fontWeight: '600',
        fontSize: getFontSize(28),
        color: Colors.White
    },
    foodImageStyle: {
        width: 40,
        height: 40,
    },
    foodTextContainer: {
        width: '50%',
    },
    foodInfoContainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        paddingHorizontal: 10
    },
    startImage: {
        width: 17,
        height: 17
    },
    ratingText: {
        fontWeight: '600',
        fontSize: getFontSize(12),
        color: Colors.Black,
        marginLeft: 10
    },
    purchasesCount: {
        color: Colors.grey,
        fontWeight: '400',
        fontSize: getFontSize(12),
        marginLeft: 5
    },
    reviewText: {
        fontSize: getFontSize(13),
        fontWeight: '400',
        color: Colors.SplashBackgroundColor,
        textDecorationLine: 'underline',
        marginLeft: 10
    },
    reviewContainer: {
        flexDirection: "row",
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    dollarText: {
        fontSize: getFontSize(14),
        fontWeight: '600',
        color: Colors.SplashBackgroundColor,
        marginTop: 9
    },
    priceText: {
        fontSize: getFontSize(24),
        fontWeight: '600',
        color: Colors.SplashBackgroundColor
    },
    priceTextContainer: {
        flexDirection: "row",
    },
    MinusbuttonMainContainer: {
        backgroundColor: Colors.White,
        width: 30,
        height: 30,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.SplashBackgroundColor
    },
    MinusbuttonImageStyle: {
        width: 10,
        height: 2,
    },
    priceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10
    },
    counterContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    counterText: {
        fontWeight: '600',
        fontSize: getFontSize(12),
        color: Colors.Black
    },
    foodDescription: {
        fontWeight: '400',
        fontSize: getFontSize(15),
        color: Colors.grey,
        lineHeight: 23.55
    },
    foodDescriptionContainer: {
        alignSelf: 'center',
        marginTop: 10
    },
    foodItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "space-between",
        marginTop: 10
    },
    priceSelectionContainer: {
        flexDirection: "row",
        alignItems: 'center',

    },
    foodpriceText: {
        fontSize: getFontSize(12),
        fontWeight: '400',
        color: Colors.Black,
        marginRight: 10
    },
    selectedCircle: {
        width: 13,
        height: 13,
        borderRadius: 50,
        backgroundColor: Colors.SplashBackgroundColor,
        shadowColor: 'red',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
    },
    unSelectedCircle: {
        width: 21.5,
        height: 21.5,
        borderRadius: 50,
        borderWidth: 1,
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center',

    },
    foodHeading: {
        fontWeight: "600",
        fontSize: getFontSize(18),
        color: Colors.Black
    },
    cartText: {
        fontWeight: '600',
        fontSize: getFontSize(15),
        color: Colors.White,
        marginLeft: 15
    },
    cartButtonContainer: {
        height: 53,
        backgroundColor: Colors.SplashBackgroundColor,
        borderRadius: 29,
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 5,
        alignSelf: 'center',
        position: "absolute",
        bottom: 20
    },
    buttonImage: {
        width: 40,
        height: 40,
        backgroundColor: Colors.White,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
})