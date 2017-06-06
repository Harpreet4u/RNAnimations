/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  LayoutAnimation,
  UIManager,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {
  COLOR,
  ThemeProvider,
  Button,
  ActionButton,
  Toolbar,
  RadioButton,
  BottomNavigation,
} from 'react-native-material-ui';

import FadeInView from './FadeInView';

const { height, width } = Dimensions.get('window');
const uiTheme = {
  pallete: {
    primaryColor: COLOR.gree500,
  },
  toolbar: {
    container: {
      height: 50,
    }
  }
};

export default class MyAnimations extends Component {
  constructor(props) {
    super(props);
    /*let originalGetDefaultProps = Text.getDefaultProps;
    Text.getDefaultProps = function() {
      return {
        ...originalGetDefaultProps(),
        allowFontScaling: false,
      };
    };*/
    // Fixes Text scaling issue on android
    Text.defaultProps.allowFontScaling = false;
    if (Platform.OS === 'android') {
      // Required for running animations on Android.
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.state = {w: 100, h: 100, active: 'today'};
    this._onPress = this._onPress.bind(this);
  }

  componentWillMount() {
    LayoutAnimation.spring();
  }

  _onPress() {
    LayoutAnimation.spring();
    this.setState({w: this.state.w + 15, h: this.state.h + 15});
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <Toolbar
            leftElement="arrow-back"
            onLeftElementPress={() => {console.log("Hello");}}
            centerElement="Awesome React"
          />
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <FadeInView style={{backgroundColor: 'powderblue'}}>
            <Text style={styles.instructions}>
              To get started, edit index.android.js
            </Text>
            <Text style={styles.instructions}>
              Double tap R on your keyboard to reload,{'\n'}
              Shake or press menu button for dev menu
            </Text>
          </FadeInView>
          <View style={{alignItems: 'center'}}>
            <View style={[styles.box, {width: this.state.w, height: this.state.h}]} />
            <TouchableOpacity onPress ={this._onPress}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  Press me!
                </Text>
              </View>
            </TouchableOpacity>
            </View>
          <View style={{flex: 3, alignItems: 'center'}}>
            <Button primary text="Primary " />
            <Button primary text="Accent " />
            <Button raised primary text="Primary Raised " />
            <Button disabled text="Disabled " />
          </View>
          <View style={{ flex: 1 }}>
            <RadioButton
              label="Unchecked"
              checked
              checkedIcon="star"
              uncheckedIcon="star-border"
              value="Value"
              />
          </View>

          <ActionButton
            icon="done"
            actions={['email', 'phone', 'sms', 'favorite']}
            transition="speedDial"
            style={{ positionContainer: { bottom: 76} }}
          />

          <BottomNavigation
            active={this.state.active}
            style={{ container: {  position: 'absolute', bottom: 0, left: 0, right: 0 } }}
             >
              <BottomNavigation.Action
                  key="today"
                  icon="today"
                  label="Today"
                  onPress={() => this.setState({ active: 'today' })}
                  style={{container: {minWidth:null}}}
              />
              <BottomNavigation.Action
                  key="people"
                  icon="people"
                  label="People"
                  onPress={() => this.setState({ active: 'people' })}
                  style={{container: {minWidth:null}}}
              />
              <BottomNavigation.Action
                  key="bookmark-border"
                  icon="bookmark-border"
                  label="Bookmark"
                  onPress={() => this.setState({ active: 'bookmark-border' })}
                  style={{container: {minWidth:null}}}
              />
              <BottomNavigation.Action
                  key="settings"
                  icon="settings"
                  label="Settings"
                  onPress={() => this.setState({ active: 'settings' })}
                  style={{container: {minWidth:null}}}
              />
          </BottomNavigation>

        </View>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  box: {
    margin: 10,
    backgroundColor: 'orange'
  },
  button: {
    width: 80,
    height: 50,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  buttonText: {
    color: 'white'
  },
});

AppRegistry.registerComponent('MyAnimations', () => MyAnimations);
