import React from 'react';
import {View, Modal, Image} from 'react-native';
import style from './loading-indicator.style';

const LoadingIndicatorComponent = props => {
  const {
    modalContainer,
    innerContainerTransparentStyle,
    modalBackgroundStyle,
    imageStyle,
  } = style;
  const {loading} = props;
  return (
    <Modal animationType="fade" transparent={true} visible={loading}>
      <View style={[modalContainer, modalBackgroundStyle]}>
        <View style={innerContainerTransparentStyle}>
          <Image
            source={require('../../assets/loading.gif')}
            style={imageStyle}
          />
        </View>
      </View>
    </Modal>
  );
};

export default LoadingIndicatorComponent;
