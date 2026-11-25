import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

import { ShelfScreen } from '@/components/shelf-screen';
import { FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function BookDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();

  return (
    <ShelfScreen>
      <Text
        style={{
          color: theme.text,
          fontSize: FontSize.title,
        }}
      >
        Details of book {id}
      </Text>
    </ShelfScreen>
  );
}