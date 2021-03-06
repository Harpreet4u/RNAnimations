import React, { Component } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { Image, View } from 'react-native-animatable';
import Playground from './playground';
import Home from './home';
import Endgame from './endGame';

@inject(allStores => ({
  currentScreen: allStores.router.currentScreen,
}))

@observer
export default class App extends Component {

  static defaultProps = {
    currentScreen: 'HOME'
  };

  render() {
    let content;
    switch (this.props.currentScreen) {
      case 'HOME':
        content = <Home />;
        break;
      case 'PLAYGROUND':
        content = <Playground />;
        break;
      case 'ENDGAME':
        content = <Endgame />;
        break;
      default:
        content = <View />;
        break;
    }
    return (
      <Image source={require('./images/bg.jpg')} style={styles.container}>
        <StatusBar hidden={true} />
        {content}
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
});
