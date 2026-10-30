import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BookDetailsScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.heading}>Book Details</Text>

      <View style={styles.card}>
        <Text style={styles.title}>The Little Prince</Text>
        <Text style={styles.author}>Antoine de Saint-Exupéry</Text>
        <Text style={styles.status}>Currently Reading</Text>

        <Text style={styles.description}>
          The story of a little prince who travels to different planets
          and learns about friendship, love, and responsibility.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F7F3EC',
  },
  heading: {
    fontSize: 30,
    fontWeight: '700',
    color: '#283C30',
    marginBottom: 28,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#283C30',
  },
  author: {
    fontSize: 16,
    color: '#666666',
    marginTop: 10,
  },
  status: {
    color: '#526B50',
    fontWeight: '600',
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 25,
    color: '#444444',
    marginTop: 24,
  },
});