import React, { Element } from 'react';
import { View, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import env from './config/env';

const TouchableView = (props) => {
  const { isRippleDisabled, rippleColor, children, style, ...otherProps } = props;
  if (env.IS_MATERIAL_DESIGN_SUPPORTED && !isRippleDisabled) {
    const background = TouchableNativeFeedback.Ripple(rippleColor, false);
    return (
      <TouchableNativeFeedback {...otherProps} background={background}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    );
  } else {
    return (
      <TouchableOpacity {...otherProps} style={style}>
        {children}
      </TouchableOpacity>
    );
  }
};

export default TouchableView;
