import { RouteProp } from '@react-navigation/native';
import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SvgIcon from '../components/UI/SvgIcon';

export const getTabStackIcon =
  (route: RouteProp<any, any>) =>
    ({ focused, color }: { focused: boolean; color: string }) => {
      let iconName: string;
      const svgIcons = ['Documents', 'Notes', 'Contacts', 'Events'];

      if (svgIcons.includes(route.name)) {
        if (route.name === 'Documents') {
          return <SvgIcon color={color} size={25} name='documents' />;
        } else if (route.name === 'Contacts') {
          return <SvgIcon color={color} size={25} name='contacts' />;
        } else if (route.name === 'Notes') {
          return <SvgIcon color={color} size={25} name='notes' />;
        } else if (route.name === 'Events') {
          return <SvgIcon color={color} size={25} name='events' />;
        } else {
          return <Icon name='question' size={25} color={color} solid={focused} />;
        }
      } else {
        if (route.name === 'Chat' || route.name === 'Support') {
          iconName = 'comment-alt';
        } else if (route.name === 'Enabling') {
          iconName = 'user';
        } else {
          iconName = 'question';
        }

        return <Icon name={iconName} size={25} color={color} solid={focused} />;
      }
    };
