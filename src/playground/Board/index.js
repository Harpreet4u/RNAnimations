import React, { Component } from 'react';
import { View } from 'react-native-animatable';
import BoardTile from '../BoardTile';
import { StyleSheet } from 'react-native';
import metrics from '../../config/metrics';
import { observer } from 'mobx-react/native';

@observer
export default class TilesCarousel extends Component {
  constructor(props) {
    super(props);
    this._tileRefs = [];
  }

  animateFailure = () => {
    this._tileRefs.forEach(ref => {
      if (ref) {
        ref.animateFailure();
      }
    });
  };

  render() {
    this._tileRefs = [];
    return (
      <View style={styles.container}>
        {this.props.tiles.map((tile, index) => (
          <BoardTile
            ref={ref => this._tileRefs[index] = ref}
            key={`board_tile_${tile.id}`}
            left={tile.x}
            bottom={tile.y}
            backgroundColor={tile.color}
            text={tile.number}
            onTilePress={() => this.props.onTilePress(tile.id)}
            isEnabled={this.props.isEnabled}
            isVisible={tile.isVisible}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: metrics.BOARD_WIDTH,
    height: metrics.BOARD_HEIGHT,
    left: 0,
    bottom: 0,
  },
});
