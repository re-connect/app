# Cloud Solidaire mobile app

## Stack

- React-native
- React-navigation
- Fastlane
- GitlabCi
- [Transcrypt](https://github.com/elasticdog/transcrypt): `brew install transcrypt`

## Setup

* Decrypt secret files
Ask the project leader for the **"Transcrypt Password"** and run:
```
transcrypt -c aes-256-cbc -p '<my-password>'
```

## Develop

‼️ YOU HAVE TO MANUALLY ADD A HOMEPAGE TO REACT_NATIVE_PERSPECTIVE_CROPPER IN THE PODFILE AFTER NPM INSTALL
