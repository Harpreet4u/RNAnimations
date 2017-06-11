import React, { Component } from 'react';
import { View } from 'react-native-animatable';
import { StyleSheet, Animated, Easing } from 'react-native';
import metrics from '../../config/metrics';
import timings from '../../config/timings';
import colors from '../../config/colors';

export default class TimeBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animateValue: new Animated.Value(timings.TIME_LIMIT_MS),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.animateValue, {
      duration: timings.TIME_LIMIT_MS,
      easing: Easing.linear, // No easing
      toValue: 0,
    }).start();
  }

  render() {
    // Animate the TimeBar color from grey to red, starting when there are left only 12 seconds
    const backgroundColor = this.state.animateValue.interpolate({
      inputRange: [0, timings.TIME_LIMIT_MS * 0.4, timings.TIME_LIMIT_MS],
      outputRange: ['rgba(255,0,0, 1)', 'rgba(0,0,0, 0.3)', 'rgba(0,0,0, 0.3)'],
    });
    // Animate the TimeBar width from DEVICE_WIDTH to 0 in TIME_LIMIT_MS (which currently is 30 seconds)
    const width = this.state.animateValue.interpolate({
      inputRange: [0, timings.TIME_LIMIT_MS],
      outputRange: [0, metrics.DEVICE_WIDTH],
    });
    return (
      <View style={styles.container}>
        <View style={[styles.content, { width, backgroundColor }]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  content: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: metrics.TIME_BAR_HEIGHT,
    borderColor: colors.TRANSPARENT_DARK,
    borderWidth: 1,
  },
});
