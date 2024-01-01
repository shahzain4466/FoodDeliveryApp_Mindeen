import { StyleSheet } from 'react-native';
import { scale } from '../../../../utils/scale';
import theme from '../../../themes/theme';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.padding.p1,
        backgroundColor:"transparent",
    },
    timecontainer: {
        alignItems: 'center',
        width: '100%',
        marginTop: scale(90)

    },
    line: {
        borderBottomWidth: scale(3),
        alignSelf: 'center'
    },
    timeCounter: {
        fontSize: scale(36),
        lineHeight: scale(46),
        fontWeight: '400',
        color: theme.palette.DarkBlack
    },
    trackinfo: {
        height: (38),
        ...theme.typography.common.h3r,
        color: theme.palette.DarkBlack,
        alignSelf: "center",
        marginVertical: scale(20)
    },
    trackinfo1: {
        width: scale(217),
        height: (38),
        ...theme.typography.common.h3r,
        color: theme.palette.DarkBlack,
        alignSelf: "center",
        marginVertical: scale(20)
    },
    img: {
        width: scale(165),
        height: scale(165),
        borderRadius: scale(12),
        alignSelf: 'center'
    },
    mapimg:{
        width: scale(178),
        height: scale(275),
        borderRadius: scale(12),
        alignSelf: 'center'
    },
    titletxt: {
        ...theme.typography.common.h2r,
        fontWeight: '600',
        color: theme.palette.white
    },
    check: {
        marginVertical: scale(30),
        width: '40%',
        alignSelf: 'center',
        position: 'absolute',
        bottom: scale(10)
    },
    itemNane:{
        fontSize:scale(28),
        lineHeight:scale(32),
        fontFamily:theme.typography.type.reg,
        fontWeight:"600",
        width:scale(169),
        height:scale(64),
        color:theme.palette.DarkBlack,
        marginTop:scale(10),
        alignSelf:'center',
        textAlign:'center'
    },
    photoimg:{
      width:scale(64),
      height:scale(64)  
    },
    nametxt:{
        ...theme.typography.common.h3r,
        color:theme.palette.DarkBlack
    },
    timetxt:{
        ...theme.typography.common.h3r,
        color:theme.palette.GrayDark,
        marginLeft:scale(5)
    },
    profileCon:{
        backgroundColor:theme.palette.white,
        padding:scale(10),
        marginTop:scale(20),
        shadowColor: theme.palette.shadowColor,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 0.2,
        elevation: 5,
        borderRadius:scale(10)
    },
    downView:{
        position:"absolute",
        top:scale(20),
        left:scale(15)

    },
    lineContainer:{
        width:'60%',
        borderWidth:1,
        alignSelf:'center'
    },
    mainContainer:{
        flex:1,
     },
     header:{
         backgroundColor:"transparent", 
     },
     bckimg:{ 
        width: '100%', 
        height: 200, 
        resizeMode: "cover" 
    }
})
export default styles