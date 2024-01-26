import { StyleSheet, Text, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../store/auth-context';
import axios from 'axios';

function WelcomeScreen() {
  const [message, setMessage] = useState('');
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(
        'https://authentication-rn-9d5c0-default-rtdb.firebaseio.com/message.json?auth=' +
          authCtx.token
      )
      .then((response) => setMessage(response.data));
  }, [authCtx.token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{message}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
