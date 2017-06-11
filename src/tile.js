import React, { Component } from 'react';
import { View } from 'react-native-animatable';
import {
  LayoutAnimation,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import CustomText from './customText';
import colorUtils from './colorUtils';
import audioService from './services/audio';
import metrics from './config/metrics';
import { observer } from 'mobx-react/native';

@observer
export default class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTouched: false,
      hasBeenPressed: false,
    };
  }

  _containerRef = null;

  getContainerRef = () => this._containerRef;

  _handlePressIn = () => {
    const { isEnabled, singlePressOnly, onPressIn, playSound} = this.props;
    if (!isEnabled) return;
    if (singlePressOnly && this.state.hasBeenPressed) return;
    playSound();
    LayoutAnimation.spring();
    this.setState({ isTouched: true });
    if (onPressIn) {
      onPressIn();
    }
    return true;
  };

  _handlePressOut = () => {
      const { isEnabled, singlePressOnly, onPressOut } = this.props;
      if (!isEnabled) return;
      if (singlePressOnly && this.state.hasBeenPressed) return; // Prevent double presses
      if (onPressOut) {
        onPressOut();
      }
      this.setState({ isTouched: false, hasBeenPressed: true });
    };

    render() {
        const {
          depth,
          borderRadius,
          backgroundColor,
          text,
          textStyle,
          style,
          ...otherProps
        } = this.props;
        const { isTouched } = this.state;
        const halfDepth = depth / 2; // The bottom gap, needed to shop the the depth
        const tileStyle = {
          marginTop: isTouched ? depth : halfDepth,
          backgroundColor,
          borderRadius,
        };
        const depthStyle = {
          marginTop: -borderRadius,
          height: isTouched ? halfDepth + borderRadius : depth + borderRadius,
          backgroundColor: colorUtils.getDifferentLuminance(backgroundColor, -0.2), // Darker color for the depth
          borderBottomLeftRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
        };
        return (
          <TouchableWithoutFeedback
            onPressIn={this._handlePressIn}
            onPressOut={this._handlePressOut}
            delayPressIn={0}
          >
            <View
              ref={ref => {
                this._containerRef = ref;
              }}
              {...otherProps}
            >
              <View style={[styles.tile, tileStyle, style]}>
                <CustomText style={[styles.text, textStyle]} withShadow={true}>
                  {text}
                </CustomText>
              </View>
              <View style={[styles.depth, depthStyle]} />
            </View>
          </TouchableWithoutFeedback>
        );
      }
}

Tile.defaultProps = {
  depth: metrics.TILE_SHADOW_DEPTH,
  borderRadius: metrics.TILE_BORDER_RADIUS,
  backgroundColor: 'red',
  text: '1',
  isEnabled: true,
  singlePressOnly: true,
  playSound: audioService.playSuccessSound,
};


const styles = StyleSheet.create({
  tile: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  depth: {
    zIndex: 1,
  },
  text: {
    color: 'white',
    // reason for fonts not working in android
    // font should be saved as fontname_bold.ttf
    fontWeight: 'bold',
    fontFamily: 'PermanentMarker',
    fontSize: 39,
  },
});
