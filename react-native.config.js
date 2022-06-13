module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assests/fonts/'],
  dependencies: {
    'react-native-document-scanner': {
      platforms: {
        android: null, // disable Android platform, other platforms will still autolink if provided
      },
    },
    'react-native-perspective-image-cropper': {
      platforms: {
        android: null, // disable Android platform, other platforms will still autolink if provided
      },
    },
  },
};
