import React, { Component } from 'react';
import { View } from 'react-native-animatable';
import metrics from './config/metrics';
import Tile from './tile';
import CustomText from './customText';
import boardUtils from './boardUtils';
import audioService from './services/audio';
import { StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react/native';

@inject(allStores => ({
  navigateToPlayground: allStores.router.navigateToPlayground,
  pressedTiles: allStores.game.pressedTiles,
  score: allStores.game.score,
}))

@observer
export default class Endgame extends Component {

  static defaultProps = {
    pressedTiles: [],
    navigateToPlayground: () => null,
    score: 0,
  };
  
  constructor(props) {
    super(props);
    this._containerRef = null;
    this._contentRef = null;

    this.state = {
      buttonColor: boardUtils.getRandomTileColor(),
      hasPressedButton: false,
    };
  }

  _handleRestartPress = async () => {
    this.setState({ hasPressedButton: true }); // Prevents button presses while animating to the new screen
    await this._contentRef.fadeOut(300, {useNativeDriver: true});
    await this._containerRef.zoomOut();
    this.props.navigateToPlayground();
  };

  render() {
    const { buttonColor, hasPressedButton } = this.state;
    const size = metrics.DEVICE_HEIGHT * 1.3;
    // ContainerStyle handles the first 'expanding circle' animation
    const containerStyle = {
      position: 'absolute',
      bottom: metrics.DEVICE_HEIGHT / 2 - size / 2,
      left: metrics.DEVICE_WIDTH / 2 - size / 2,
      height: size,
      width: size,
      borderRadius: size / 2,
      justifyContent: 'center',
      alignItems: 'center',
    };
    return (
      <View
        ref={ref => {
          this._containerRef = ref;
        }}
        style={[styles.container, containerStyle]}
        pointerEvents={'box-none'}
        animation={'zoomIn'}
        duration={500}
        useNativeDriver
      >
        <View
          ref={ref => {
            this._contentRef = ref;
          }}
          style={styles.content}
        >
          <View style={styles.header}>
            <CustomText
              style={styles.headerText}
              withShadow={true}
              animation={'bounceIn'}
              delay={500}
              useNativeDriver
            >
              {'Your score:'}
            </CustomText>
            <CustomText
              style={styles.scoreText}
              withShadow={true}
              animation={'bounceIn'}
              delay={700}
              useNativeDriver
            >
              {this.props.score}
            </CustomText>
          </View>
          <View style={styles.body}>
            <Tile
              animation={'bounceIn'}
              delay={900}
              depth={metrics.TILE_SHADOW_DEPTH}
              backgroundColor={buttonColor}
              text={'RESTART'}
              onPressOut={() => this._handleRestartPress()}
              style={styles.button}
              textStyle={styles.buttonText}
              isEnabled={!hasPressedButton}
              playSound={audioService.playButtonSound}
              useNativeDriver
            />
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0,0.5)',
  },
  content: {
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT,
  },
  header: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 52,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
  },
  scoreText: {
    fontSize: 66,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
  },
  body: {
    flex: 2,
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
