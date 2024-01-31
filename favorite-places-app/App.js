import { deleteDb, init } from './util/database';
import { useEffect, useState } from 'react';

import AddPlace from './screens/AddPlace';
import AllPlaces from './screens/AllPlaces';
import AppLoading from 'expo-app-loading';
import { Colors } from './constants/colors';
import IconButton from './components/ui/IconButton';
import Map from './screens/Map';
import { NavigationContainer } from '@react-navigation/native';
import PlaceDetails from './screens/PlaceDetails';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!dbInitialized) return <AppLoading />;

  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.gray700,
            contentStyle: {
              backgroundColor: Colors.gray700,
            },
          }}
        >
          <Stack.Screen
            name='AllPlaces'
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon='add'
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate('AddPlace')}
                />
              ),
            })}
          />
          <Stack.Screen
            name='AddPlace'
            component={AddPlace}
            options={{
              title: 'Add a New Place',
            }}
          />
          <Stack.Screen
            name='PlaceDetails'
            component={PlaceDetails}
            options={{
              title: 'Loading Place...',
            }}
          />
          <Stack.Screen name='Map' component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
