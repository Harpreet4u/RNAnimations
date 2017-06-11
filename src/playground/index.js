import React, { Component } from 'react';
import { View } from 'react-native-animatable';
import Board from './Board';
import TimeBar from './TimeBar';
import { StyleSheet } from 'react-native';
import metrics from '../config/metrics';
import { inject, observer } from 'mobx-react/native';

@inject(allStores => ({
  navigateToEndgame: allStores.router.navigateToEndgame,
  board: allStores.game.board,
  isGameRunning: allStores.game.isGameRunning,
  isBoardValid: allStores.game.isBoardValid,
  score: allStores.game.score,
  startGame: allStores.game.startGame,
  handleTilePress: allStores.game.handleTilePress,
}))

@observer
export default class Playground extends Component {
  static defaultProps = {
    navigateToEndgame: () => null,
    board: [],
    isGameRunning: false,
    isBoardValid: false,
    score: 0,
    timeLeft: 0,
    startGame: () => null,
    handleTilePress: () => null,
  };

  constructor(props) {
    super(props);
    this._boardRef = null;
  }

  componentDidMount() {
    this.props.startGame();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isGameRunning && !this.props.isGameRunning) {
      this.props.navigateToEndgame();
    } else if (prevProps.isBoardValid && !this.props.isBoardValid) {
      if (this._boardRef) {
        this._boardRef.animateFailure();
      }
    }
  }

  _handleTilePress = (tileId) => {
    this.props.handleTilePress(tileId);
  };

  render() {
    const { isBoardValid, isGameRunning, board } = this.props;
    return (
      <View style={styles.container} animation={'fadeIn'} useNativeDriver>
        {isGameRunning && <TimeBar />}
        <Board
          ref={ref => {
            this._boardRef = ref;
          }}
          tiles={board}
          onTilePress={this._handleTilePress}
          isEnabled={isBoardValid}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    position: 'absolute',
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT,
  },
  overlay: {
    position: 'absolute',
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT,
    backgroundColor: 'black',
    opacity: 0.2,
  },
});
