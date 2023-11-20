import { StyleSheet, Text, View } from 'react-native';

function List({ data }) {
  return data.map((value) => (
    <View key={value} style={styles.listItem}>
      <Text style={styles.itemText}>{value}</Text>
    </View>
  ));
}

export default List;

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 12,
    marginVertical: 4,
    backgroundColor: '#e2b497',
  },
  itemText: {
    color: '#351401',
    textAlign: 'center',
  },
});