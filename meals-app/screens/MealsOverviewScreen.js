import { CATEGORIES, MEALS } from '../data/dummy-data';

import MealsList from '../components/MealsList/MealsList';
import { useLayoutEffect } from 'react';

function MealsOverviewScreen({ route, navigation }) {
  const categoryId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(categoryId) >= 0;
  });

  // set dynamic settings to navigation
  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === categoryId
    ).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [categoryId, navigation]);

  return <MealsList items={displayedMeals} />;
}

export default MealsOverviewScreen;
