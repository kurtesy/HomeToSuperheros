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

import APILayer, {getCharacters} from './services/APILayer';

class SuperHero extends Component {
  state = {
    isLoading: false,
    data: [],
    searchText: 'batman',
  };

  componentDidMount() {
    this.initialize();
  }

  componentWillMount() {}

  initialize = async () => {
    if (this.state.searchText !== '') {
      this.setState({isLoading: true});
      getCharacters(this.state.searchText).then(res => {
        console.log('initialize', JSON.stringify(res));
        this.setState({data: res, isLoading: true});
      });
    }
  };

  updateSearch = searchText => {
    this.setState({searchText});
  };

  searchHim = () => {
    this.initialize();
  };

  render() {
    const {isLoading, searchText, data} = this.state;
    return (
      <View>
        <Header
          leftComponent={{icon: 'menu', color: '#fff'}}
          centerComponent={{
            text: 'Home to Super Heros',
            style: {color: '#fff', fontSize: 25},
          }}
          rightComponent={{icon: 'home', color: '#fff'}}
        />
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={searchText}
        />
        <ScrollView style={styles.listStyle}>
          <Overlay
            isVisible={isLoading}
            windowBackgroundColor="rgba(255, 255, 255, .5)"
            overlayBackgroundColor="red"
            width="auto"
            height="auto">
            {/* <Text>Gaining Energy...</Text> */}
            <Image
              source={require('./assets/bolt.gif')}
              style={styles.loaderImage}
              resizeMode={'center'}
            />
          </Overlay>
          {data.map((item, index) => (
            <ListItem
              key={index}
              leftAvatar={{source: {uri: item.image.url}, size: 200}}
              title={item.name}
              subtitle={item.biography.publisher}
              bottomDivider>
              <Image
                source={{uri: item.image.url}}
                style={{width: 200, height: 200}}
              />
            </ListItem>
          ))}
        </ScrollView>
        <Button raised primary text="Woosh!!" onPress={this.searchHim} />
      </View>
    );
  }
}

// Define some colors and default sane values
const styles_util = {
  colors: {primaryColor: '#af0e66'},
  dimensions: {defaultPadding: 12},
  fonts: {largeFontSize: 18, mediumFontSize: 16, smallFontSize: 12},
};

// Define styles here
const styles = StyleSheet.create({
  listStyle: {
    height: '75%',
  },
  loaderImage: {
    opacity: 0.3,
    position: 'absolute',
    right: '-50%',
    bottom: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SuperHero;
