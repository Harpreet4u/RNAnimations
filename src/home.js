import React, { Component } from 'react';
import { LayoutAnimation, StyleSheet } from 'react-native';
import { Image, View } from 'react-native-animatable';
import Tile from './tile';
import audioService from './services/audio';
import metrics from 'config/metrics';


export default class Home extends Components {
  constructor(props) {
    super(props);
    this.state = {
      hasPressedButton: false,
      hasHeaderAppeared: false,
    };
  }

  componentDidMount() {
    if (this.refs.header) {
      this.refs.header.bounceInRight(1000).then(() => {
        LayoutAnimation.spring();
        this.state({ hasHeaderAppeared: true });
      });
    }
  }

  _handleTilePress = () => {
    console.log("Tile pressed");
  }

  _handleButtonPress = async () => {
    this.setState({ hasPressedButton: true });
    if (this.refs.header && this.refs.body) {
      await Promise.all([this.refs.header.fadeOutLeft(400), this.refs.body.fadeOutRight(400)]);
    }
    // Other things here...
  };

  render() {
    const { hasHeaderAppeared, hasPressedButton } = this.state;

    return (
      <View style={style.container}>
        <View
          style={styles.header}
          ref="header">
          
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
            <Image resizeMode={'contain'} source={LogoImage} style={styles.logo} />
          </View>
        </View>
        { hasHeaderAppeared &&
          <View
            style={styles.body}
            ref="body">
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
    marginLeft: metris.DEVICE_WIDTH * 0.05,
    height: null,
    width: LogoWidth,
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
