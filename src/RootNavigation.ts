import * as React from 'react';
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<any>();

type ScreenParams = {
  [key: string]: string;
};

export function navigate(name: string, params?: ScreenParams) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
