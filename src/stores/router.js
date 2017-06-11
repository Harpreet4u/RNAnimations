import { observable } from 'mobx';

export default class RouterStore {
  @observable currentScreen = 'HOME';

  navigateToHome = () => {
    this.currentScreen = 'HOME';
  };
  
  navigateToPlayground = () => {
    this.currentScreen = 'PLAYGROUND';
  };
  
  navigateToEndgame = () => {
    this.currentScreen = 'ENDGAME';
  };
}
