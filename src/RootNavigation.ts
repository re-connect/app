import * as React from 'react';
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params: object) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
