import { View, Text, Image, Alert, ImageBackground, Animated, Easing, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Frame from '../../common/core/Frame'
import styles from './styles'
import Images from '../../../assets/images'
import Botton from '../../common/core/Button'
import { Strings } from '../../../constants/Strings'
import Iconmaps from '../../../assets/svg/Iconmaps.svg'
import DropDown from '../../../assets/svg/DropDown.svg'
import { scale } from '../../../../utils/scale'
import theme from '../../../themes/theme'
import { Screens } from '../../../constants/constants'

let progress;
const TrackOrder = ({ navigation }) => {

    const [time, setTime] = useState({ hours: 1, minutes: 20, seconds: 37 });
    const [lineWidth, setLineWidth] = useState('100%');
    const [lineColor, setLineColor] = useState('#FEBB00'); // Initial color

    useEffect(() => {
        const interval = setInterval(() => {
            if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
                clearInterval(interval);
            } else {
                if (time.minutes === 0 && time.seconds === 0) {
                    setTime({
                        hours: time.hours - 1,
                        minutes: 59,
                        seconds: 59,
                    });
                } else if (time.seconds === 0) {
                    setTime({
                        ...time,
                        minutes: time.minutes - 1,
                        seconds: 59,
                    });
                } else {
                    setTime({
                        ...time,
                        seconds: time.seconds - 1,
                    });
                }
                const totalSeconds = time.hours * 3600 + time.minutes * 60 + time.seconds;
                progress = (totalSeconds / (1 * 3600 + 20 * 60 + 37)) * 100;
                setLineWidth(`${100 - progress}%`);
                if (progress >= 98) {
                    setLineColor('#FEBB00');
                }
                else {
                    setLineColor('#C5002E');
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    const formatTime = (value) => (value < 10 ? `0${value}` : value);

    console.log(progress);
    return (

        <ImageBackground
            source={Images.vegitabletop}
            style={styles.mainContainer}
            imageStyle={styles.bckimg}

        >

            <Frame
                style={styles.container}
                mode={'view'}
                headerVariant={'v2'}
                headerStyle={styles.header}
            >

                <View style={styles.timecontainer}>
                    <Text style={styles.timeCounter}>
                        {`${formatTime(time.hours)}h : ${formatTime(time.minutes)}m : ${formatTime(time.seconds)}s`}
                    </Text>
                </View>
                <View style={[styles.line, { width: '60%', borderBottomColor: lineColor }]}></View>
                {progress >= 60 ?
                    <Text style={styles.trackinfo1}>{Strings.orderstart}</Text>
                    :
                    progress <= 40 ?
                        <Text style={styles.trackinfo}>{Strings.Cooking}</Text>
                        :
                        progress <= 20 ?
                            <Text style={styles.trackinfo}>{Strings.onWay}</Text>
                            :
                            null
                }
                {progress >= 20 ?
                    <Image
                        source={Images.kabab}
                        style={styles.img}

                    />
                    :
                    <TouchableOpacity onPress={() => navigation.navigate(Screens.TrackOrderlocation)}>
                        <Image
                            source={Images.mapImg}
                            style={styles.mapimg}

                        />
                    </TouchableOpacity>

                }
                {
                    progress >= 20 ?
                        <Text style={styles.itemNane}>{'Ground Beef Tacos'}</Text>
                        :
                        null
                }
                <View style={styles.profileCon}>
                    <TouchableOpacity 
                    onPress={()=>navigation.navigate(Screens.TrackOrderlocation)}
                    style={{ flexDirection: 'row' }}>
                        <Image
                            source={Images.photoProfile}
                            style={styles.photoimg}
                        />
                        <TouchableOpacity style={styles.downView}>
                            <DropDown />
                        </TouchableOpacity>
                        <View style={{ padding: scale(10) }}>
                            <Text style={styles.nametxt}>{'Mr Kemplas'}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Iconmaps />
                                <Text style={styles.timetxt}>{'08 minutes on the way'}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <Botton
                    titleStyle={styles.titletxt}
                    title={'Go Back'}
                    singleButtonStyle={styles.check}
                    onPress={() => navigation.goBack()}
                />

            </Frame>
        </ImageBackground>
    )
}
export default TrackOrder