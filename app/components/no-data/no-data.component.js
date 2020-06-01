import React from 'react';
import {View, Text} from 'react-native';

const Nodata = () => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{textAlign: 'center'}}>No User Data</Text>
        </View>
      </View>
    </View>
  );
};

export default Nodata;
