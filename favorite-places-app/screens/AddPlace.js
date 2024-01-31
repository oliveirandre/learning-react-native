import PlaceForm from '../components/places/PlaceForm';

function AddPlace({ navigation }) {
  function createPlaceHandler(place) {
    navigation.navigate('AllPlaces', {
      place: place,
    });
  }

  return <PlaceForm onSubmitPlace={createPlaceHandler} />;
}

export default AddPlace;
