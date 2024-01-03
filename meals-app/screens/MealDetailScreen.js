import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { addFavorite, removeFavorite } from '../store/redux/favorites';
import { useContext, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FavoritesContext } from '../store/context/favorites-context';
import IconButton from '../components/IconButton';
import List from '../components/MealDetail/List';
import { MEALS } from '../data/dummy-data';
import MealDetails from '../components/MealDetails';
import Subtitle from '../components/MealDetail/Subtitle';

function MealDetailScreen({ route, navigation }) {
  // const favoriteMealsCtx = useContext(FavoritesContext);
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();

  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  // const isMealFavorite = favoriteMealsCtx.ids.includes(mealId);
  const isMealFavorite = favoriteMealIds.includes(mealId);

  function changeFavoriteStatusHandler() {
    if (isMealFavorite) {
      // favoriteMealsCtx.removeFavorite(mealId);
      dispatch(removeFavorite({ id: mealId }));
    } else {
      // favoriteMealsCtx.addFavorite(mealId);
      dispatch(addFavorite({ id: mealId }));
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            onTap={changeFavoriteStatusHandler}
            icon={isMealFavorite ? 'star' : 'star-outline'}
            color='white'
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle subtitle={'Ingredients'} />
          <List data={selectedMeal.ingredients} />
          <Subtitle subtitle={'Steps'} />
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white',
  },
  detailText: {
    color: 'white',
  },
  listOuterContainer: {
    alignItems: 'center',
  },
  listContainer: {
    width: '80%',
  },
});
