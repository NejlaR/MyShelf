import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyShelfScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.logo}>MyShelf</Text>
        <Text style={styles.heading}>My Books</Text>
        <Text style={styles.subtitle}>Your little library.</Text>

        <View style={styles.card}>
          <Text style={styles.bookTitle}>The Little Prince</Text>
          <Text style={styles.author}>Antoine de Saint-Exupéry</Text>
          <Text style={styles.status}>Currently Reading</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.bookTitle}>The Hobbit</Text>
          <Text style={styles.author}>J. R. R. Tolkien</Text>
          <Text style={styles.status}>Want to Read</Text>
        </View>

        <View style={styles.button}>
          <Text style={styles.buttonText}>+ Add Book</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F3EC',
  },
  content: {
    padding: 24,
    paddingBottom: 120,
  },
  logo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#526B50',
    marginBottom: 28,
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
    color: '#283C30',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 8,
    marginBottom: 28,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 16,
    marginBottom: 16,
  },
  bookTitle: {
    fontSize: 21,
    fontWeight: '600',
    color: '#283C30',
  },
  author: {
    fontSize: 15,
    color: '#666666',
    marginTop: 8,
  },
  status: {
    color: '#526B50',
    fontWeight: '500',
    marginTop: 18,
  },
  button: {
    backgroundColor: '#374B3E',
    padding: 18,
    borderRadius: 14,
    marginTop: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});