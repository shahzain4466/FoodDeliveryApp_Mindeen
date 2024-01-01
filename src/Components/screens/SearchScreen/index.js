import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import Input from '../../common/core/Input';
import Frame from '../../common/core/Frame';
import {Strings} from '../../../constants/Strings';
import Back from '../../../assets/svg//ChevronBack.svg';
import Txt from '../../common/core/Txt';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import styles from './styles';
import SearchResturent from '../../common/others/SearchResturent/SearchResturent';
import Images from '../../../assets/images';
import {GetSuggestions} from '../../../redux/action/GetSuggestions';
import {GetRecentSearch} from '../../../redux/action/GetRecentSearch';
import {GetHomeSearch} from '../../../redux/action/GetHomeSearch';
import theme from '../../../themes/theme';
import Filter from '../../common/others/Filter/Filter';
import SearchedFoods from '../../common/others/SearchedFoods/SearchedFoods';
import {CleanupDeleteMethod} from '../../../redux/slices/DeleteRecentsearchSlice';

const SearchScreen = ({navigation}) => {
  const {token} = useSelector(state => state?.userData?.isAuthenticated);
  const AllSuggestion = useSelector(state => state?.getSuggestions);
  const RecentSearch = useSelector(state => state?.getRecentSearch);
  const [selectedOption, setSelectedOption] = useState(Strings.Restaurant);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState(true);
  const [hasPerformedSearch, setHasPerformedSearch] = useState(false);
  const [user, setUser] = useState(null);
  const [errorState, setError] = useState({status: false, msg: ''});
  const [suggestions, setSuggestions] = useState([]);
  const [RestrecentSearches, setRestrecentSearches] = useState([]);
  const [foodrecentSearches, setFoodrecentSearches] = useState([]);
  const [suggestionsData, setSuggestionsData] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showfoodSuggestions, setShowfoodSuggestions] = useState(true);
  const [restaurantSuggestions, setRestaurantSuggestions] = useState([]);
  const [foofSuggestions, setFoodSuggestions] = useState([]);
  const [homeSearch, setHomeSearch] = useState([]);
  const [homeFoodSearch, setHomeFoodSearch] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [priceFilter, setPriceFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('');

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  //Suggestions
  const {
    data: getsAllSuggestion,
    loading: loadingAllSuggestion,
    error: errorAllSuggestion,
  } = useMemo(() => AllSuggestion, [AllSuggestion]);

  useEffect(() => {
    if (loadingAllSuggestion) {
      setError({status: false, msg: ''});
    } else if (errorAllSuggestion) {
      const {message, success} = errorAllSuggestion;
      setError({status: !success, msg: message});
    } else if (getsAllSuggestion) {
      if (selectedOption === Strings.Restaurant) {
        setSuggestionsData(getsAllSuggestion?.data);
        // console.log('4444>><<',getsAllSuggestion?.data);
      } else if (selectedOption === Strings.Food) {
        // console.log('222>><<',getsAllSuggestion?.data);
        setSuggestionsData(getsAllSuggestion?.data);
      }

      setError({status: false, msg: ''});
    }
  }, [getsAllSuggestion, loadingAllSuggestion, errorAllSuggestion]);

  // RecentSearch
  const {
    data: getsRecentSearch,
    loading: loadingRecentSearch,
    error: errorRecentSearch,
  } = useMemo(() => RecentSearch, [RecentSearch]);

  useEffect(() => {
    if (loadingRecentSearch) {
      setError({status: false, msg: ''});
    } else if (errorRecentSearch) {
      const {message, success} = errorRecentSearch;
      setError({status: !success, msg: message});
    } else if (getsRecentSearch) {
      if (selectedOption === Strings.Restaurant) {
        // console.log('3333/>>',JSON.stringify(getsRecentSearch?.data));
        setRestrecentSearches(getsRecentSearch?.data);
      } else if (selectedOption === Strings.Food) {
        setFoodrecentSearches(getsRecentSearch?.data);
      }

      setError({status: false, msg: ''});
    }
  }, [getsRecentSearch, loadingRecentSearch, errorRecentSearch]);

  // Homepage search
  const HomeSearch = useSelector(state => state?.getHomeSearch);
  const {
    data: getHomeSearch,
    loading: loadingHomeSearch,
    error: errorHomeSearch,
  } = useMemo(() => HomeSearch, [HomeSearch]);

  useEffect(() => {
    if (loadingHomeSearch) {
      setError({status: false, msg: ''});
    } else if (errorHomeSearch) {
      const {message, success} = errorHomeSearch;
      setError({status: !success, msg: message});
    } else if (getHomeSearch) {
      if (selectedOption === Strings.Restaurant) {
        setHomeSearch(getHomeSearch);
        console.log('******', getHomeSearch.data);
        setShowSuggestions(false);
        setShowSearch(true);
      } else if (selectedOption === Strings.Food) {
        setHomeFoodSearch(getHomeSearch);
        setShowfoodSuggestions(false);
        setShowSearch(true);
      }

      setError({status: false, msg: ''});
    }
  }, [getHomeSearch, loadingHomeSearch, errorHomeSearch]);

  useEffect(() => {
    dispatch(GetSuggestions(token, selectedOption, status));
  }, [dispatch, token, isFocused, selectedOption]);

  useEffect(() => {
    dispatch(GetRecentSearch(token, selectedOption, status));
  }, [dispatch, token, isFocused, selectedOption, showSearch]);

  const clearSuggestions = () => {
    if (selectedOption === Strings.Restaurant) {
      setRestaurantSuggestions([]);
      setShowSuggestions(true);
      setShowSearch(false);
    } else if (selectedOption === Strings.Food) {
      setFoodSuggestions([]);
      setShowfoodSuggestions(true);
      setShowSearch(false);
    }
  };

  useEffect(() => {
    clearSuggestions();
  }, [selectedOption]);

  useEffect(() => {
    return () => {
      dispatch(CleanupDeleteMethod());
    };
  }, []);

  const handleSelectChange = option => {
    setStatus(true);
    setSelectedSuggestion(null);
    setSearchQuery('');
    setSelectedOption(option);
    console.log('option12', option);
  };

  const filterSuggestions = (suggestionsData, query) => {
    if (!query) return suggestionsData;
    const filteredSuggestions = suggestionsData?.filter(item =>
      (item?.name || '')
        ?.toLowerCase()
        ?.startsWith((query || '')?.toLowerCase()),
    );
    return filteredSuggestions;
  };

  const handleSearchInputChange = val => {
    setSearchQuery(val);
    setShowSearch(false);
    if (val?.length >= 3) {
      if (selectedOption === Strings.Restaurant) {
        const filteredSuggestions = filterSuggestions(suggestionsData, val);
        setRestaurantSuggestions(filteredSuggestions);
        setShowSuggestions(true);
      } else if (selectedOption === Strings.Food) {
        const filteredSuggestions = filterSuggestions(suggestionsData, val);
        setFoodSuggestions(filteredSuggestions);
        setShowfoodSuggestions(true);
      }
    } else {
      if (selectedOption === Strings.Restaurant) {
        setRestaurantSuggestions([]);
      } else if (selectedOption === Strings.Food) {
        setFoodSuggestions([]);
      }
    }
  };

  const performSearch = () => {
    setHasPerformedSearch(true);
    if (searchQuery) {
      if (selectedOption === Strings.Restaurant) {
        setShowSearch(true);
        dispatch(GetHomeSearch(token, selectedOption, searchQuery));
      } else if (selectedOption === Strings.Food) {
        setShowSearch(true);
        dispatch(GetHomeSearch(token, selectedOption, searchQuery));
      }
    }
  };
  console.log('showSuggestion', restaurantSuggestions);

  return (
    <Frame mode="view" style={styles.container} headerVariant={'blank'}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={[styles.headerContainer, styles.defAlignmentWithSpBtw]}>
          <TouchableOpacity
            style={styles.iconBg}
            onPress={() => navigation.goBack()}>
            <Back />
          </TouchableOpacity>
        </View>
        <Input
          placeholder={Strings.search}
          search
          InputStyling={{width: '100%'}}
          value={searchQuery}
          onChangeTest={val => handleSearchInputChange(val)}
          Closeicon
          closePress={() => {
            setSearchQuery('');
            setSelectedSuggestion(null);
            if (selectedOption === Strings.Restaurant) {
              setShowSuggestions(true);
              setShowSearch(false);
              setRestaurantSuggestions(null);
            } else if (selectedOption === Strings.Food) {
              setShowfoodSuggestions(true);
              setShowSearch(false);
              setFoodSuggestions(null);
            }
          }}
          Filtericon
          filterPress={() => setShowFilter(true)}
          ContentContainerStyle={styles.searchcon}
          onSubmitEditing={performSearch}
        />
      </View>
      <View style={styles.container1}>
        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === Strings.Restaurant && styles.selected,
          ]}
          onPress={() => {
            setUser(null);
            handleSelectChange(Strings.Restaurant);
          }}>
          <Text
            style={[
              styles.emailText,
              selectedOption === Strings.Restaurant && styles.selectedAccount,
            ]}>
            {Strings.prRestaurant}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === Strings.Food && styles.selected,
          ]}
          onPress={() => {
            setUser(null);
            handleSelectChange(Strings.Food);
          }}>
          <Text
            style={[
              styles.emailText,
              selectedOption === Strings.Food && styles.selectedAccount,
            ]}>
            {Strings.prFood}
          </Text>
        </TouchableOpacity>
      </View>
      {selectedOption === Strings.Restaurant ? (
        // <></>
        <SearchedFoods
          showSuggestions={showSuggestions}
          showSearch={showSearch}
          homeSearch={homeSearch}
          RestrecentSearches={RestrecentSearches}
          selectedSuggestion={selectedSuggestion}
          restaurantSuggestions={restaurantSuggestions}
          setShowSuggestions={setShowSuggestions}
          setSelectedSuggestion={setSelectedSuggestion}
          setSearchQuery={setSearchQuery}
          setShowSearch={setShowSearch}
          setHomeSearch={setHomeSearch}
          setError={setError}
          searchQuery={searchQuery}
          selectedOption={selectedOption}
          suggestionsData={suggestionsData}
        />
      ) : (
        <SearchedFoods
          showfoodSuggestions={showfoodSuggestions}
          foodrecentSearches={foodrecentSearches}
          foofSuggestions={foofSuggestions}
          showSearch={showSearch}
          homeFoodSearch={homeFoodSearch}
          selectedSuggestion={selectedSuggestion}
          setShowSuggestions={setShowSuggestions}
          setSelectedSuggestion={setSelectedSuggestion}
          setSearchQuery={setSearchQuery}
          setShowSearch={setShowSearch}
          setHomeSearch={setHomeSearch}
          setHomeFoodSearch={setHomeFoodSearch}
          setShowfoodSuggestions={setShowfoodSuggestions}
          setError={setError}
          searchQuery={searchQuery}
          selectedOption={selectedOption}
          suggestionsData={suggestionsData}
        />
      )}
      <Filter
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        setPriceFilter={setPriceFilter}
        setRatingFilter={setRatingFilter}
        setTimeFilter={setTimeFilter}
      />
    </Frame>
  );
};

export default SearchScreen;
