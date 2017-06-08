import React, { Element } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-animatable';
import TouchableView from './touchableView';
import metrics from './config/metrics';

const CustomText = (props) => {
  const { onPress, style, children, withShadow, ...otherProps } = props;
  const fontSize = StyleSheet.flatten(style).fontSize || 14;
  // copied from facebook f8 app.
  const scaledFontSize = Math.round(fontSize * metrics.DEVICE_WIDTH / 375);
  const shadowStyle = {
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowRadius: 0,
    textShadowOffset: {
      height: 4,
      width: 4,
    },
  };
  const textStyle = [styles.text, withShadow ? shadowStyle : {}, style];
  const text = (
    <Text style={[textStyle, { fontSize: scaledFontSize }]} {...otherProps}>
      {children}
    </Text>
  );
  return onPress ? <TouchableView onPress={onPress}>{text}</TouchableView> : text;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Permanent Marker',
    padding: 8, // Fixes cutted off text
  },
});

export default CustomText;
