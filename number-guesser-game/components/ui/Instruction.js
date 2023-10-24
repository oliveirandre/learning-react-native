import { StyleSheet, Text } from 'react-native';

import Colors from '../../constants/colors';

function Instruction({ children, style }) {
  return <Text style={[styles.instruction, style]}>{children}</Text>;
}

export default Instruction;

const styles = StyleSheet.create({
  instruction: {
    fontFamily: 'open-sans',
    color: Colors.accent500,
    fontSize: 24,
  },
});
