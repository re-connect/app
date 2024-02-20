import Config from 'react-native-config';

export const config = {
  crispWebsiteId: Config.CRISP_WEBSITE_ID,
  sentrySecret: Config.SENTRY_SECRET,
  connexionInformation: {
    client_id: Config.CLIENT_ID,
    client_secret: Config.CLIENT_SECRET,
    grant_type: Config.GRANT_TYPE,
  },
  geniusSdkLicense: Config.GENIUS_SDK_LICENSE,
  version: Config.APP_VERSION,
};
