/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Headers,
} from 'react-native';
import {COLOR, ThemeContext, getTheme} from 'react-native-material-ui';

const superTheme = {
  palette: {
    primaryColor: COLOR.green500,
  },
};

import SuperHeroView from './SuperHeroView';

const App = () => {
  return (
    <ThemeContext.Provider value={getTheme(superTheme)}>
      <SafeAreaView>
        <View>
          <SuperHeroView />
        </View>
      </SafeAreaView>
    </ThemeContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
});

export default App;
