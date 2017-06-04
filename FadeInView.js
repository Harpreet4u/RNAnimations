import React, { Component } from 'react';
import {
  Animated
} from 'react-native';

class FadeInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 2500
      }
    ).start();
  }

  _getStyles() {
    return this.props.style !== undefined ? this.props.style : {};
  }

  render() {
    // For performance reasons always pass object
    // instead of using spread operator.
    let givenStyle = this._getStyles();
    let propStyle = Object.assign({},
      {
        ...givenStyle
      },
      {
        opacity: this.state.fadeAnim
      });
    return (
      <Animated.View
        style={propStyle}>
        {this.props.children}
      </Animated.View>
    );
  }
}
module.exports = FadeInView;
