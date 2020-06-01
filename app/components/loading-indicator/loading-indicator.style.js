import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    paddingTop: 20,
  },
  innerContainerTransparentStyle: {
    backgroundColor: '#fff',
    height: 100,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackgroundStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  imageStyle: {height: 40, width: 40},
});
export default style;
