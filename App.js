import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AddToList from './app/views/add-to-list/add-to-list.view';
import ShowUserLisr from './app/views/show-name-list/show-user-list.view';

export default class App extends Component {
  render() {
    const Drawer = createDrawerNavigator();
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Add To List" component={AddToList} />
          <Drawer.Screen name="Show User List" component={ShowUserLisr} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
