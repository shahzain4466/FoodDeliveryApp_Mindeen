import { View, Text, ScrollView, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useMemo, useEffect, useState } from 'react'
import theme from '../../../../themes/theme';
import { Strings } from '../../../../constants/Strings';
import SearchResturent from '../SearchResturent/SearchResturent';
import Images from '../../../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { GetHomeSearch } from '../../../../redux/action/GetHomeSearch';
import { scale } from '../../../../../utils/scale';
import NotFound from '../../../../assets/svg/NotFound.svg';
import Txt from '../../core/Txt';
import { DeleteRecentSearch } from '../../../../redux/action/DeleteRecentSearch';
import { GetRecentSearch } from '../../../../redux/action/GetRecentSearch';

const SearchedFoods = ({
    showfoodSuggestions,
    foodrecentSearches,
    foofSuggestions,
    showSearch, homeFoodSearch,
    selectedSuggestion,
    setShowSuggestions,
    setSelectedSuggestion,
    setSearchQuery,
    setShowSearch,
    setHomeSearch,
    setHomeFoodSearch,
    setShowfoodSuggestions,
    setError,
    selectedOption,
    showSuggestions,
    RestrecentSearches,
    restaurantSuggestions,
    homeSearch,
    searchQuery,
    suggestionsData,
}) => {
    const { token } = useSelector(state => state?.userData?.isAuthenticated);


    const searcheditems = selectedOption === Strings.Restaurant ? homeSearch?.data : homeFoodSearch?.data
    const dispatch = useDispatch()
    // homesearch
    const HomeSearch = useSelector(state => state?.getHomeSearch)
    const {
        data: getHomeSearch,
        loading: loadingHomeSearch,
        error: errorHomeSearch,
    } = useMemo(() => HomeSearch, [HomeSearch]);

    useEffect(() => {
        if (loadingHomeSearch) {
            setError({ status: false, msg: '' });
        } else if (errorHomeSearch) {
            const { message, success } = errorHomeSearch;
            setError({ status: !success, msg: message });
        } else if (getHomeSearch) {
            if (selectedOption === Strings.Restaurant) {
                setHomeSearch(getHomeSearch)
                setShowSuggestions(false)
                setShowSearch(true)
            } else if (selectedOption === Strings.Food) {
                setHomeFoodSearch(getHomeSearch)
                setShowfoodSuggestions(false)
                setShowSearch(true)
            }

            setError({ status: false, msg: '' });
        }
    }, [getHomeSearch, loadingHomeSearch, errorHomeSearch]);

    const deleteSearch = useSelector(state => state.DeleteSearches);

    const {
        data: deleteSearchData,
        loading: deleteSearchLoading,
        error: deleteSearchError,
    } = useMemo(() => deleteSearch, [deleteSearch]);

    useEffect(() => {
        if (deleteSearchLoading) {
            setError({ status: false, msg: '' });
        } else if (deleteSearchError) {
            const { message, success } = deleteSearchError;
            setError({ status: !success, msg: message });
        } else if (deleteSearchData) {
            setError({ status: false, msg: '' });
            dispatch(GetRecentSearch(token));
        }
    }, [deleteSearchData, deleteSearchLoading, deleteSearchError]);


    const DeleteMethod = (id, token) => {
        dispatch(DeleteRecentSearch(id, token))
    }

    const handleSuggestionSelect = (item) => {
        if (selectedOption === Strings.Restaurant) {
            setShowSuggestions(false);
            setSelectedSuggestion(item?.name);
            setSearchQuery(item?.name)
            setShowSearch(true)
        } else if (selectedOption === Strings.Food) {
            setShowfoodSuggestions(false)
            setSelectedSuggestion(item?.name);
            setSearchQuery(item?.name)
            setShowSearch(true)
        }

        dispatch(GetHomeSearch(token, selectedOption, item?.name))
    };


    const renderItem = (item, index) => {
        return (
            <View style={styles.itemView}>
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => {
                        handleSuggestionSelect(item)
                    }}>
                    <Text style={styles.suggest}>{item?.name}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const recentRenderItem = (item, index) => {
        return (
            <View style={styles.recentItem}>
                <View style={styles.c1}>
                    <View>
                        <TouchableOpacity
                            style={styles.recentView}
                            onPress={() => {
                                handleSuggestionSelect(item)
                            }}>
                            <Text style={styles.recent}>{item?.name}</Text>
                            <TouchableOpacity
                                style={{ pointerEvents: 'box-only', marginLeft: scale(5), padding: scale(5) }}
                                onPress={() => DeleteMethod(item?._id, token)} >
                                <Image
                                    source={Images.crossIcon}
                                    style={styles.crossimg}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };


    const available = selectedOption === Strings.Restaurant ? (showSearch && homeSearch?.data?.length > 0) : (showSearch && homeFoodSearch?.data?.length > 0);
    const dataFound = selectedOption === Strings.Restaurant ? (homeSearch?.data?.length <= 0) : (homeFoodSearch?.data?.length <= 0);
    return (
        <ScrollView style={styles.innerContainer}>
            {showfoodSuggestions && foodrecentSearches?.length > 0 || showSuggestions && RestrecentSearches?.length > 0 ?
                <Txt style={styles.heading}>{Strings.sreSearch}</Txt>
                :
                null
            }
            {showSuggestions &&
                <View style={{ width: '100%' }}>
                    <FlatList
                        style={{ flex: 1 }}
                        keyExtractor={(item, index) => item?._id}
                        data={RestrecentSearches}
                        extraData={RestrecentSearches}
                        numColumns={3}
                        renderItem={({ item, index }) => recentRenderItem(item, index)}
                    />
                </View>
            }
            {showfoodSuggestions ? (
                foodrecentSearches?.length === 0 ? (
                    <ActivityIndicator size="small" color={theme.palette.PrimaryDeep} />
                ) : (
                    <FlatList
                        keyExtractor={(item, index) => item?._id}
                        data={foodrecentSearches}
                        extraData={foodrecentSearches}
                        numColumns={3}
                        renderItem={({ item, index }) => recentRenderItem(item, index)}
                    />
                )
            )
                :
                null
            }

            {/* <View style={styles.space}></View> */}
            {
                showfoodSuggestions && foofSuggestions?.length > 0 || showSuggestions && restaurantSuggestions?.length > 0 ?
                    <Txt style={styles.heading}>{Strings.sSearch}</Txt>
                    :
                    null
            }

            {showSuggestions &&
                <FlatList
                    keyExtractor={(item, index) => item?._id}
                    numColumns={3}
                    data={restaurantSuggestions}
                    extraData={restaurantSuggestions}
                    renderItem={({ item, index }) => renderItem(item, index)}
                />
            }

            {showfoodSuggestions &&
                <FlatList
                    keyExtractor={(item, index) => item?._id}
                    numColumns={3}
                    data={foofSuggestions}
                    extraData={foofSuggestions}
                    renderItem={({ item, index }) => renderItem(item, index)}
                />
            }
            {available &&

                <>
                    {
                        loadingHomeSearch ? (
                            <ActivityIndicator size="small" color="#C5002E" />
                        ) : (
                            <>
                                <Text style={styles.avialableItem}>
                                    {homeSearch?.data?.length || homeFoodSearch?.data?.length}{Strings.numitems} {`"${selectedSuggestion ? selectedSuggestion : searchQuery}"`}
                                </Text>
                                {
                                    searcheditems.length == 0 ?
                                        <ActivityIndicator size="small" color={theme.palette.PrimaryDeep} />
                                        :
                                        <FlatList
                                            data={searcheditems}
                                            extraData={homeFoodSearch?.data || homeSearch?.data}
                                            renderItem={({ item }) => {
                                                return (
                                                    <SearchResturent
                                                        item={item}
                                                        itemCardStyle={styles.itemCardStyle}
                                                    />
                                                );
                                            }}
                                        />
                                }
                            </>
                        )
                    }
                </>
            }

            {
                showSearch &&
                (dataFound ? (
                    loadingHomeSearch ? (
                        <ActivityIndicator size="small" color="#C5002E" />
                    ) : (
                        <>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: scale(50) }}>
                                <NotFound />
                                <Text style={styles.msg}>{homeSearch?.message || homeFoodSearch?.message}</Text>
                            </View>
                            <View>
                                <Text style={styles.try}>{Strings.trythis}</Text>
                                <FlatList
                                    keyExtractor={(item, index) => item?._id}
                                    numColumns={3}
                                    data={suggestionsData}
                                    extraData={suggestionsData}
                                    renderItem={({ item, index }) => renderItem(item, index)}
                                />
                            </View>
                        </>
                    )
                ) : null)
            }

        </ScrollView>
    )
}

export default SearchedFoods
const styles = StyleSheet.create({
    innerContainer: {
        paddingHorizontal: theme.spacing.padding.p1,
    },
    heading: {
        fontSize: scale(14),
        fontWeight: '700',
        color: theme.palette.black,
    },
    msg: {
        fontSize: scale(25),
        lineHeight: 35,
        fontWeight: '700',
        alignSelf: 'center',
        color: theme.palette.black,
        // paddingVertical: scale(10)
        width: scale(295),
    },
    avialableItem: {
        fontSize: scale(14),
        lineHeight: 21,
        fontWeight: '700',
        color: theme.palette.black,
        // paddingVertical: scale(10)
    },
    recentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    c1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recentView: {
        borderWidth: 1,
        borderColor: theme.palette.PrimaryDeep,
        borderRadius: theme.radius.rounded,
        padding: theme.spacing.padding.p7,
        marginTop: theme.spacing.margin.m5,
        marginRight: theme.spacing.margin.m2,
        backgroundColor: theme.palette.PrimaryDeep,
        flexDirection: 'row',
        alignItems: 'center'
    },
    recent: {
        fontSize: theme.typography.size.heading.h5,
        color: theme.palette.white,
        paddingLeft: theme.spacing.padding.p6,
        paddingRight: theme.spacing.padding.p7,
        fontFamily: theme.typography.type.reg,
    },
    crossimg: {
        tintColor: theme.palette.white,
        width: scale(10),
        height: scale(10),
        padding: scale(5),
    },
    itemView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    touchable: {
        borderWidth: 1,
        borderColor: theme.palette.silver,
        borderRadius: theme.radius.rounded,
        padding: theme.spacing.padding.p7,
        marginTop: theme.spacing.margin.m5,
        marginRight: theme.spacing.margin.m2,
    },
    suggest: {
        fontSize: theme.typography.size.heading.h5,
        color: theme.palette.black,
        paddingLeft: theme.spacing.padding.p7,
        paddingRight: theme.spacing.padding.p7,
        fontFamily: theme.typography.type.reg,
    },
    loader: {
        fontSize: scale(14),
        color: theme.palette.Gray
    },
    try: {
        ...theme.typography.common.h3r,
        fontWeight: '700',
        color: theme.palette.TypographyDark
    }
})