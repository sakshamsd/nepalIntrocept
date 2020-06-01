import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import styles from './process-button.style';

const ProcessButton = props => {
  const {buttonContainerStyle, buttonContentStyle, buttonTextStyle} = styles;
  const {buttonText, buttonOnPress} = props;

  return (
    <View style={buttonContainerStyle}>
      <TouchableOpacity onPress={buttonOnPress}>
        <View style={buttonContentStyle}>
          <Text style={buttonTextStyle}>{buttonText}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProcessButton;
