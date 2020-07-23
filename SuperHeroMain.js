import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native'
import {Button} from 'react-native-material-ui';
import {Header, SearchBar, ListItem, Overlay} from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import APILayer, {getCharacters} from './services/APILayer';
import SuperHeroDetails from './SuperHeroDetails';

const screen = Dimensions.get('screen');

class SuperHero extends Component {
  state = {
    isLoading: false,
    data: [],
    searchText: 'batman',
    searched: false,
    dimensions: {
      height: screen.height || 200,
      width: screen.width,
    },
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
          placeholder="Enter your superhero name..."
          onChangeText={this.updateSearch}
          value={searchText}
        />
        <SuperHeroDetails name={'kurtesy'} />
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
                  titleStyle={{
                    color: styles_util.colors.primary,
                    fontWeight: 'bold',
                  }}
                  subtitleStyle={{color: styles_util.colors.secondary}}
                  style={{backgroundColor: styles_util.colors.light}}
                  bottomDivider
                />
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
        <View style={styles.button}>
          <Button
            raised
            primary
            text="Woosh!!"
            onPress={this.searchHim}
            icon={<FontAwesomeIcon name="superpowers" size={20} color="red" />}
            style={{
              text: {fontWeight: 'bold', fontSize: 20, padding: 5},
              container: {borderRadius: 10},
            }}
          />
        </View>
      </View>
    );
  }
}

// Define some colors and default values
const styles_util = {
  colors: {
    primary: '#3b2e5a',
    secondary: '#394989',
    light: '#fff48f',
    other: '#4ea0ae',
  },
  dimensions: {defaultPadding: 12},
  fonts: {largeFontSize: 18, mediumFontSize: 16, smallFontSize: 12},
};

// Define styles here
const styles = StyleSheet.create({
  listStyle: {
    height: '80%',
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
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataImg: {
    width: 300,
    height: 300,
    top: 30,
  },
  noDataTxt: {
    paddingTop: 30,
    fontSize: 50,
    fontFamily: Platform.OS === 'ios' ? 'Cochin' : 'Roboto',
  },
  button: {
    width: 150,
    position: 'absolute',
    alignSelf: 'flex-end',
    height: 20,
    padding: 10,
    top: 150,
  },
});

export default SuperHero;
