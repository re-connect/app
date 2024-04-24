import React from 'react';
import {CLIENT_ID, CLIENT_SECRET, CRISP_WEBSITE_ID, SENTRY_SECRET, GENIUS_SDK_LICENSE, APP_VERSION} from '@env';

export const config = {
  crispWebsiteId: CRISP_WEBSITE_ID,
  sentrySecret: SENTRY_SECRET,
  connexionInformation: {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'password',
  },
  geniusSdkLicense: GENIUS_SDK_LICENSE,
  version: APP_VERSION,
};
