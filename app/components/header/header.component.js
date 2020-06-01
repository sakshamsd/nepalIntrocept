import React from 'react';
import {Text} from 'react-native';
import {Left, Body, Header, Right, Button, Icon} from 'native-base';
import style from './header.style';

const HeaderComponent = props => {
  const {title, onIconPress, rightIconOnPress, rightIconName} = props;
  const {headerContainer, headerTitle, icon} = style;
  return (
    <Header style={headerContainer}>
      <Left>
        <Button onPress={onIconPress}>
          <Icon name="menu" style={icon} />
        </Button>
      </Left>
      <Body>
        <Text style={headerTitle}>{title}</Text>
      </Body>
      <Right>
        <Button transparent onPress={rightIconOnPress}>
          <Icon name={rightIconName} onPress={rightIconOnPress} style={icon} />
        </Button>
      </Right>
    </Header>
  );
};

export default HeaderComponent;
