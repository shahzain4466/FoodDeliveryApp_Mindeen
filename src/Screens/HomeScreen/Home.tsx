import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Images from '../../Assets/Images'
import Button from '../../Components/Button'
import styles from './styles';
import { useSelector } from 'react-redux';
import Colors from '../../Utiles/Colors';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const RPH = (percentage: number) => {
  return (percentage / 100) * screenHeight;
};
const RPW = (percentage: number) => {
  return (percentage / 100) * screenWidth;
};

const Home = ({ navigation }: any) => {

  const { foodData, extrasauce } = useSelector((state: any) => state.userSession)

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const toggleItemSelection = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((item) => item !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const foodRenderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => toggleItemSelection(item.id)}
        style={[styles.foodItemContainer, { width: RPW(90) }]}>
        <View style={styles.priceSelectionContainer}>
          <Image
            source={item.image}
            style={{ width: 50, height: 48, borderRadius: 100 }}
          />
          <Text style={styles.ratingText}>{item.name}</Text>
        </View>
        <View style={styles.priceSelectionContainer}>
          <Text style={styles.foodpriceText}>{item.price}</Text>
          <View
            style={[styles.unSelectedCircle, {
              borderColor: selectedItems ? Colors.SplashBackgroundColor : Colors.grey,
            }]}>
            {
              selectedItems.includes(item.id) &&
              <View style={styles.selectedCircle}></View>
            }
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  const extraSaucesRenderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => toggleItemSelection(item.id)}
        style={[styles.foodItemContainer, { width: RPW(90) }]}>
        <View style={styles.priceSelectionContainer}>
          <Image
            source={item.image}
            style={{ width: 50, height: 48, borderRadius: 100 }}
          />
          <Text style={styles.ratingText}>{item.name}</Text>
        </View>
        <View style={styles.priceSelectionContainer}>
          <Text style={styles.foodpriceText}>{item.price}</Text>
          <View
            style={[styles.unSelectedCircle, {
              borderColor: selectedItems ? Colors.SplashBackgroundColor : Colors.grey,
            }]}>
            {
              selectedItems.includes(item.id) &&
              <View style={styles.selectedCircle}></View>
            }
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={[styles.headerContainer, { width: RPW(90), height: RPH(30) }]}>
        <Image source={Images.HeaderBackground} style={styles.headerBackground} />
        <View style={styles.headerButtonsContainer}>
          <Button
            buttonMainContainer={styles.buttonMainContainer}
            buttonImage={Images.BackIcon}
            buttonStyle={styles.buttonImageStyle}
          />
          <Button
            buttonMainContainer={styles.heartButtonMainContainer}
            buttonImage={Images.Heart}
            buttonStyle={styles.heartButtonImageStyle}
          />
        </View>
        <View style={styles.foodInfoContainer}>
          <View style={styles.foodTextContainer}>
            <Text style={styles.foodHeadingStyle}>
              {'Ground Beef Tacos'}
            </Text>
          </View>
          <View>
            <Image source={Images.Food1} style={styles.foodImageStyle} />
            <Image source={Images.Food2} style={styles.foodImageStyle} />
          </View>
        </View>
      </View>
      <View style={[styles.reviewContainer, { width: RPW(90) }]}>
        <Image source={Images.Star} style={styles.startImage} />
        <Text style={styles.ratingText}>{'4.5'}</Text>
        <Text style={styles.purchasesCount}> {'(30+)'}</Text>
        <Text style={styles.reviewText}>{'See Review'}</Text>
      </View>
      <View style={[styles.priceContainer, { width: RPW(90) }]}>
        <View style={[styles.priceTextContainer, { width: RPW(50) }]}>
          <Text style={styles.dollarText}>{'$'}</Text>
          <Text style={styles.priceText}>{'9.50'}</Text>
        </View>
        <View style={[styles.counterContainer, { width: RPW(30) }]}>
          <Button
            onPress={() => decrement()}
            buttonMainContainer={styles.MinusbuttonMainContainer}
            buttonImage={Images.Minus}
            buttonStyle={styles.MinusbuttonImageStyle}
          />
          <Text style={styles.counterText}>{count}</Text>
          <Button
            onPress={() => increment()}
            buttonMainContainer={styles.heartButtonMainContainer}
            buttonImage={Images.Plus}
            buttonStyle={styles.heartButtonImageStyle}
          />
        </View>
      </View>
      <ScrollView>
        <View style={[styles.foodDescriptionContainer, { width: RPW(90) }]}>
          <Text style={styles.foodDescription}>
            {'Brown the beef better. Lean ground beef – I like to use 85% lean angus. Garlic – use fresh chopped. Spices – chili powder, cumin, onion powder.'}
          </Text>
        </View>
        <View style={{ width: RPW(90), alignSelf: "center", marginTop: 10 }}>
          <Text style={styles.foodHeading}>
            {'Choice of Add On'}
          </Text>
        </View>
        <FlatList
          data={foodData}
          renderItem={foodRenderItem}
          keyExtractor={(item, index) => `${item.id} , ${index}`}
        />
        <View style={{ width: RPW(90), alignSelf: "center", marginTop: 10 }}>
          <Text style={[styles.foodHeading, { marginTop: 15 }]}>
            {'Extra Sauce'}
          </Text>
        </View>
        <FlatList
          style={{ marginBottom: 60, }}
          data={extrasauce}
          renderItem={extraSaucesRenderItem}
          keyExtractor={(item, index) => `${item.id} , ${index}`}
        />
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('Location')}
        style={[styles.cartButtonContainer, { width: RPW(50), }]}>
        <View style={styles.buttonImage}>
          <Image
            source={Images.Cart}
            style={{ width: 16, height: 17 }}
          />
        </View>
        <Text style={styles.cartText}>{'Add to cart '}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Home
