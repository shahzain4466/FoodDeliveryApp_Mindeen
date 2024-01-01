import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { scale } from '../../../../../utils/scale'
import theme from '../../../../themes/theme'
import EmptyRectangle from '../../../../assets/svg/EmptyRectangle.svg'
import FillRectangle from '../../../../assets/svg/FillRectangle.svg'
import QuantityControl from '../QuantityControl/QuantityControl'

const ExtraItem = ({ sourceimg, title, price }) => {


    const [quantity, setQuantity] = useState(1)
    const [visible, setVisible] = useState(false)

    const increaseQuantity = () => {
        setQuantity(quantity + 1)
    }

    const decreaseQuantity = () => {
        setQuantity(quantity - 1)
    }
    return (
        <View style={styles.main}>
            <View style={styles.itemimg}>
                <Image
                    source={sourceimg}
                    style={styles.img}
                />
                <Text style={styles.itemname}>{title}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                <View style={styles.selectitem}>
                    <Text style={styles.price}>{price}</Text>
                    <TouchableOpacity onPress={() => setVisible(!visible)}>
                        {visible ?
                            <FillRectangle />
                            :
                            <EmptyRectangle />
                        }
                    </TouchableOpacity>
                </View>
                {visible ?
                    <View style={{ alignItems: 'flex-end', marginTop: scale(5), marginRight: scale(20) }}>
                        <QuantityControl
                            negtiveBtn={'-'}
                            btnStyle={styles.btn}
                            btntxt={styles.txt}
                            addBtn={'+'}
                            negtivePress={() => decreaseQuantity()}
                            addPress={() => increaseQuantity()}
                            quantity={quantity}
                        // data={data}
                        />
                    </View>
                    :
                    null
                }
            </View>
        </View>
    )
}

export default ExtraItem
const styles = StyleSheet.create({
    main: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: scale(5),
        alignItems: 'center'
    },
    itemimg: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    img: {
        width: scale(50),
        height: scale(50),
        borderRadius: 100
    },
    itemname: {
        ...theme.typography.common.h3r,
        color: theme.palette.DarkBlack,
        marginLeft: scale(10)
    },
    selectitem: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    price: {
        ...theme.typography.common.bodyr,
        color: theme.palette.DarkBlack,
        marginRight: scale(10)
    },
    btn: {
        width: scale(22),
        height: scale(22),
        borderRadius: scale(10),
        // alignItems:'center',
        // justifyContent:'center',
    },
    txt: {
        fontSize: 11
    }
})