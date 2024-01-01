import { StyleSheet } from 'react-native';
import { scale } from '../../../../utils/scale';
import theme from '../../../themes/theme';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.padding.p1,
        backgroundColor:"transparent",
    },
    confirmtxt:{
        fontSize:scale(20),
        lineHeight:scale(26),
        fontWeight:'500',
        color:theme.palette.PrimaryDeep,
        marginTop:scale(20)
    },
    img:{
        width:scale(60),
        height:scale(60),
        resizeMode: 'contain',
    },
    ChargesCon:{
        width:'100%',
        alignSelf:'center',
        borderRadius:scale(10),
        position:'absolute',
        bottom:scale(10),
        backgroundColor:theme.palette.PrimaryDeep,

    },
    titletxt:{
        ...theme.typography.common.h3r,
        color:theme.palette.white
    },
    chargestxt:{
        ...theme.typography.common.h3r,
        color:theme.palette.white
    },
    signtxt:{
        ...theme.typography.common.h3r,
        color:theme.palette.white
    },
    total:{
        marginTop:scale(14),
        
    },
    totalstyle:{
        fontSize:scale(18),
        lineHeight:scale(28)
    },
    bnttitle: {
        ...theme.typography.common.h2r,
        fontWeight: '600',
        color:theme.palette.PrimaryDeep
      },
      btn: {
        width:'30%',
        height:scale(50),
        marginLeft:scale(0),
        position:'absolute',
        right:scale(10)
      
      },
      check:{
        marginVertical:scale(30),
        backgroundColor: theme.palette.white,
        width:'100%',
        alignSelf:'center'
      },
      imageBackGround:{
        width: '100%',
      },
    overlay:{
        paddingHorizontal:scale(20),
        borderRadius:scale(10)
        },
        mainContainer:{
           flex:1,
        },
        header:{
            backgroundColor:"transparent", 
        }
})
export default styles