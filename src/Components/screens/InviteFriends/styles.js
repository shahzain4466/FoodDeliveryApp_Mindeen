import { scale } from '../../../../utils/scale';
import theme from '../../../themes/theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.padding.p1,
    },
    btntxt: {
        ...theme.typography.common.h2r,
        fontWeight: '600',
        color: theme.palette.simpleWhite
    },
    btn: {
        position: "absolute",
        bottom: scale(10),
        alignSelf: 'center'
    },
    invitepic:{
        width:scale(374),
        height:scale(278),
        alignSelf:'center'
    },
    invitehead:{
        marginTop:scale(30),
        alignSelf:"center",
        width:scale(299)
    },
    Inviteheading1:{
       fontSize: scale(22),
       lineHeight:26,
       fontWeight:'700' ,
       color: theme.palette.black

    },
    Inviteheading2:{
        fontSize: scale(22),
        lineHeight:26,
        fontWeight:'700' ,
        color: theme.palette.PrimaryDark
    },
    InviteDesc:{
        ...theme.typography.common.h2r,
        color: theme.palette.Graydesctxt,
        width:scale(299),
        alignSelf:'center'
    }
})
export default styles