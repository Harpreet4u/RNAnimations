import { action, computed, observable } from 'mobx';
import { filter, find, orderBy, times } from 'lodash';
import timings from '../config/timings';
import boardUtils from '../boardUtils';
import timeUtils from '../timeUtils';
import audioService from '../services/audio';
import uuid from 'uuid';

export default class GameStore {

  @observable tiles = [];
  @observable isGameRunning = false;
  @observable isEndgame = false;
  @observable isBoardValid = false;
  @observable level = 0;
  @observable score = 0;

  @action startGame = () => {
    this.level = 1;
    this.score = 0;
    this.isGameRunning = true;
    this.buildBoard();
    this.startTimer();
  };

  @action goToNextLevel = () => {
    this.level++;
    this.buildBoard();
  };

  @action buildBoard = () => {
    // Called on every round start (round, not game): it builds the board's tiles
    this.tiles = [];
    this.isBoardValid = true;
    const numberOfTiles = boardUtils.getNumberOfTiles(this.level);
    const alreadyPickedNumbers = [];
    const alreadyPickedColors = [];
    times(numberOfTiles, n => {
      const id = uuid.v4();
      const { x, y } = boardUtils.getRandomTilePosition(this.tiles);
      const number = boardUtils.getRandomNumber(this.level, alreadyPickedNumbers);
      const color = boardUtils.getRandomTileColor(alreadyPickedColors);
      const isVisible = true;
      alreadyPickedNumbers.push(number);
      alreadyPickedColors.push(color);
      this.tiles.push({ id, x, y, number, color, isVisible });
    });
  };

  @action startTimer = async () => {
    await timeUtils.delay(timings.TIME_LIMIT_MS);
    this.isGameRunning = false;
  };

  @action handleTilePress = async (tileId) => {
    const pressedTile = find(this.tiles, { id: tileId });
    const activeTiles = filter(this.tiles, 'isVisible');
    const sortedActiveTiles = orderBy(activeTiles, 'number');
    // If the pressed tile was the one with the lowest number..
    if (pressedTile.number === sortedActiveTiles[0].number) {
      pressedTile.isVisible = false;
      this.score++;
      if (this.isBoardEmpty) {
        this.goToNextLevel();
      }
      // ...otherwise
    } else {
      this.isBoardValid = false;
      audioService.playFailureSound();
      await timeUtils.delay(1000); // Wait for the "failure" animation
      this.buildBoard();
    }
  };

  @computed get board() {
    return this.tiles.slice();
  }

  @computed get isBoardEmpty() {
    return this.tiles.slice().filter(t => t.isVisible === true).length === 0;
  }

}
