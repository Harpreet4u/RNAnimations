import React, { Component } from 'react';
import { LayoutAnimation, StyleSheet } from 'react-native';
import { Image, View } from 'react-native-animatable';
import Tile from './tile';
import boardUtils from './boardUtils';
import audioService from './services/audio';
import metrics from './config/metrics';
import { inject, observer } from 'mobx-react/native';

@inject(allStores => ({
  navigateToPlayground: allStores.router.navigateToPlayground,
  navigateToEndgame: allStores.router.navigateToEndgame,
}))

@observer
export default class Home extends Component {
  static defaultProps = {
    navigateToPlayground: () => null,
    navigateToEndgame: () => null,
  };

  constructor(props) {
    super(props);
    this.state = {
      tileNumber: 3,
      tileColor: '#BC0437',
      hasPressedButton: false,
      hasHeaderAppeared: false,
    };

    this._header =  null;
    this._body =  null;
  }

  componentDidMount() {
    if (this._header) {
      this._header.bounceInRight(3000).then(() => {
        LayoutAnimation.spring();
        this.setState({ hasHeaderAppeared: true });
      });
    }
  }

  _handleTilePress = () => {
    console.log("Tile pressed");
    const { tileNumber, tileColor } = this.state;
    this.setState({
      tileNumber: tileNumber === 99 ? 1 : tileNumber + 1,
      tileColor: boardUtils.getRandomTileColor([tileColor])
    });
  }

  _handleButtonPress = async () => {
    this.setState({ hasPressedButton: true });
    if (this._header && this._body) {
      await Promise.all([this._header.fadeOutLeft(400), this._body.fadeOutRight(400)]);
    }
    // Other things here...
    this.props.navigateToPlayground();
  };

  render() {
    const { hasHeaderAppeared, tileNumber, tileColor, hasPressedButton } = this.state;

    return (
      <View style={styles.container} useNativeDriver>
        <View
          style={styles.header}
          ref={refs => {this._header = refs;}}>
          
          <View style={styles.headerLeft}>
            <Tile
              backgroundColor={tileColor}
              text={tileNumber}
              onPressOut={this._handleTilePress}
              style={styles.tile}
              textStyle={styles.tileText}
              singlePressOnly={false}
            />
          </View>
          <View style={styles.headerRight}>
            <Image resizeMode={'contain'} source={require("./images/logo.png")} style={styles.logo} />
          </View>
        </View>
        { hasHeaderAppeared &&
          <View
            style={styles.body}
            ref={refs => {this._body = refs;}}>
            <Tile
              backgroundColor={tileColor}
              text={'Start Game'}
              style={styles.button}
              textStyle={styles.buttonText}
              onPressOut={this._handleButtonPress}
              isEnabled={!hasPressedButton}
              playSound={audioService.playButtonSound}
              />
          </View>
        }
      </View>
    );

  }

}

const tileSize = metrics.DEVICE_WIDTH * 0.26;
const logoWidth = metrics.DEVICE_WIDTH * 0.50;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tile: {
    width: tileSize,
    height: tileSize,
  },
  tileText: {
    fontSize: 40,
  },
  logo: {
    flex: 1,
    marginLeft: metrics.DEVICE_WIDTH * 0.05,
    height: null,
    width: logoWidth,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 36,
  },
});
