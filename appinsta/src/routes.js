
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';

import Feed from './pages/Feed';
import New from './pages/New';
import Icon from 'react-native-vector-icons/FontAwesome';

const Routes = () =>{
    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
          <Stack.Navigator 
          initialRouteName="Feed"
          screenOptions = {({ route, navigation }) => ({
            headerBackTitle: null,
            headerTintColor: '#000',
          })}
          >
            <Stack.Screen 
              options={({ route,navigation }) => ({
               title: (<Icon  name="instagram" size={30}/>),
                headerRight: () => (
                  <Text style={{marginRight: 20}}
                    onPress={() => navigation.navigate('New')}
                  ><Icon  name="camera" size={27}/></Text>
                ),
              })}
            name="Feed"  component={Feed} />
            <Stack.Screen options={{title: 'Nova Publicação'}}  name="New" component={New} />
          </Stack.Navigator>
        </NavigationContainer>
      );
}

export default Routes;