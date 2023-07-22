import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import NavigationProvider from './src/navigation/navigator';

function App(): JSX.Element {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <NavigationProvider />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
