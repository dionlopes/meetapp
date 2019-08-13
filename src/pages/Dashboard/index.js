import React from 'react';
import { View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Dashboard() {
  return <View />;
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list-ul" size={20} color={tintColor} />
  ),
};
