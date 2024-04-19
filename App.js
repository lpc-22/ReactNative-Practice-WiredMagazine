import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

// Stack Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// View
import Home from './screens/HomeView'
import VideoDetail from './screens/VideoView'
import FavoriteList from './screens/FavoriteList'

const Stack = createStackNavigator()

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen component={Home} name="Home"></Stack.Screen>
          <Stack.Screen component={VideoDetail} name="Video"></Stack.Screen>
          <Stack.Screen component={FavoriteList} name="Favorite"></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
