import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  StyleSheet,
} from 'react-native';
import {Button} from 'react-native-material-ui';
import {Header, SearchBar, ListItem, Overlay} from 'react-native-elements';

class SuperHeroDetails extends Component {
  constructor(props) {
    super(props);
    console.log('SuperHeroDetails', props);
  }
  render() {
    return (
      <View>
        <Text>This is Details Page</Text>
      </View>
    );
  }
}

export default SuperHeroDetails;
