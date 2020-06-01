import React from 'react';
import {Text, View} from 'react-native';
import style from './user-list-item.style';

const UserlistComponent = props => {
  const {
    itemContainer,
    itemKeyContainer,
    keyTextStyle,
    itemValueContainer,
    valueTextStyle,
  } = style;
  const {title, value} = props;
  return (
    <View style={itemContainer}>
      <View style={itemKeyContainer}>
        <Text style={keyTextStyle}>{title}</Text>
      </View>

      <View style={itemValueContainer}>
        <Text style={valueTextStyle}>{value}</Text>
      </View>
    </View>
  );
};

export default UserlistComponent;
