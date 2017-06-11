import React, { Component } from 'react';
import { View } from 'react-native';
import Tile from '../../tile';
import metrics from '../../config/metrics';
import { observer } from 'mobx-react/native';

@observer
export default class BoardTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: this.props.isVisible,
    };
  }
  _tileRef = null;

  _handlePressOut = async () => {
    this.props.onTilePress();
    if (this._tileRef && this._tileRef.getContainerRef()) {
      await this._tileRef.getContainerRef().bounceOut(200, {useNativeDriver: true});
    }
    this.setState({ isVisible: false });
  };

  animateFailure = async () => {
    if (this._tileRef && this._tileRef.getContainerRef()) {
      await this._tileRef.getContainerRef().swing(400, {useNativeDriver: true});
    }
    if (this._tileRef && this._tileRef.getContainerRef()) {
      await this._tileRef.getContainerRef().bounceOut(450, {useNativeDriver: true});
    }
    this.setState({ isVisible: false });
  };

  render() {
    const { left, bottom, backgroundColor, text, isEnabled } = this.props;
    const { isVisible } = this.state;
    const containerStyle = {
      position: 'absolute',
      left,
      bottom,
    };
    const tileSize = {
      width: metrics.TILE_SIZE,
      height: metrics.TILE_SIZE,
    };
    if (!isVisible) return null;
    return (
      <View style={containerStyle}>
        <Tile
          style={tileSize}
          ref={ref => {
            this._tileRef = ref;
          }}
          animation={'bounceIn'}
          backgroundColor={backgroundColor}
          text={text}
          onPressOut={this._handlePressOut}
          isEnabled={isEnabled}
          useNativeDriver
        />
      </View>
    );
  }
}
