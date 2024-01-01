import { StyleSheet } from 'react-native';
import { scale } from '../../../../utils/scale';
import theme from '../../../themes/theme';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.padding.p1,
        backgroundColor: 'transparent',
    },
    header: {
        backgroundColor: 'transparent',
    },
    img: {
        width: '100%',
        height: '50%',
    },
    bottomContainer: {
        width: '100%',
        height: '50%',
        borderTopLeftRadius: scale(30),
        backgroundColor:theme.palette.white,
    },
    timehead: {
        color: theme.palette.DarkBlack,
        ...theme.typography.common.h3r,
        fontWeight: "500",
        paddingHorizontal: scale(15),
        paddingTop: scale(10)
    },
    timetxt: {
        fontSize: scale(20),
        lineHeight: scale(30),
        fontWeight: '800',
        color: theme.palette.DarkBlack,

    },
    prfimg: {
        width: '15%',
        height: scale(54)
    },
    cutomername: {
        ...theme.typography.common.h2sb,
        fontWeight: '500',
        color: theme.palette.DarkBlack
    },
    delvtxt: {
        ...theme.typography.common.h3r,
        fontWeight: '500',
        color: theme.palette.DarkBlack
    },
    numtxt: {
        ...theme.typography.common.bodyr,
        fontWeight: '500',
        color: theme.palette.DarkBlack
    },
    customerCon: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: scale(5)
    },
    customermain: {
        flexDirection: 'row',
        paddingHorizontal: scale(15)
    },
    timeView: {
        flexDirection: 'row',
        paddingHorizontal: scale(15)
    },
    numView: {
        width: '60%',
        paddingHorizontal: scale(5)
    },
    mapMarkerOuterBg: {
        backgroundColor: '#C5002E15',
        borderRadius: theme.radius.rounded/0.2,
        justifyContent: 'center',
        alignItems: 'center',
        height: scale(150),
        width: scale(150, true),
      },
      mapMarkerInnerBg: {
        backgroundColor: '#C5002E35',
        borderRadius: theme.radius.rounded,
        justifyContent: 'center',
        alignItems: 'center',
        height: scale(65),
        width: scale(65, true),
      },
      headerContainer: {
        position:'absolute',
        left:scale(10),
        top:scale(20),
      },
      btnicon: {
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

})
export default styles