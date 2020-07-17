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
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import APILayer, {getCharacters} from './services/APILayer';

class SuperHero extends Component {
  state = {
    isLoading: false,
    data: [],
    searchText: 'batman',
    searched: false,
  };

  componentDidMount() {
    this.initialize();
  }

  initialize = async () => {
    if (this.state.searchText !== '') {
      this.setState({isLoading: true});
      getCharacters(this.state.searchText).then(res => {
        console.log('initialize', JSON.stringify(res));
        this.setState({data: res, isLoading: false});
      });
    }
  };

  updateSearch = searchText => {
    this.setState({searchText});
  };

  searchHim = () => {
    this.initialize();
    this.setState({searched: true});
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
            overlayBackgroundColor="rgba(0, 0, 0, .5)"
            width="auto"
            height="auto"
            style={styles.overlay}>
            <Image
              source={require('./assets/bolt.gif')}
              style={styles.loaderImage}
              resizeMode={'center'}
            />
          </Overlay>
          {data.length > 0
            ? data.map((item, index) => (
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
              ))
            : this.state.searched && (
                <View style={styles.noData}>
                  <Image
                    source={require('./assets/rocket_wink.gif')}
                    style={styles.noDataImg}
                  />
                  <Text style={styles.noDataTxt}>Nothing Found!</Text>
                </View>
              )}
        </ScrollView>
        <View style={{width: 100, alignSelf: 'center'}}>
          <Button
            raised
            primary
            text="Woosh!!"
            onPress={this.searchHim}
            icon={<FontAwesomeIcon name="superpowers" size={16} color="red" />}
          />
        </View>
      </View>
    );
  }
}

// Define some colors and default values
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
    opacity: 0.5,
    position: 'absolute',
    left: -290,
    top: -290,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    opacity: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noData: {
    top: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataImg: {
    width: 200,
    height: 200,
  },
  noDataTxt: {
    fontSize: 50,
    fontFamily: 'Cochin',
  },
});

export default SuperHero;
