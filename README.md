# Cloud Solidaire mobile app

## Stack

- React-native
- React-navigation
- Fastlane
- GitlabCi
- [Transcrypt](https://github.com/elasticdog/transcrypt): `brew install transcrypt`

## Setup

- Decrypt secret files
Ask the project leader for the **"Transcrypt Password"** and run:

```#!/bin/bash
transcrypt -c aes-256-cbc -p '<my-password>'
```

- on iOS to install pods, for arm architecture (Apple Silicon ships), run :

```#!/bin/bash
arch -x86_64 pod install --repo-update
```

## Local dev

Check the following things
* `ENV: 'debug'`  in `src/environments/index.js`
* For iOS, you could check in XCODE if Reconnect/Signing & Capabilities/All has the right bundle identifier com.reconnect.CloudSolidaire.debug and the matching provisioning profile
* npx expo run:ios
* npx expo run:android
* yarn ios
* yarn android

## Bump app version

When you bump the version, you should add 1 to all the following variables

* In the 4 following env files: `.env` `.env.local` `.env.preprod` `.env.prod`
* In the 5 following  variables
    * `APP_VERSION=xxx`
    * `ANDROID_VERSION_CODE=100000xxx`
    * `ANDROID_VERSION_NAME=1.0.xxx`
    * `IOS_VERSION_BUILD_NUMBER=100000xxx`
    * `IOS_VERSION=1.0.xxx`

## Deploy prod or preprod

Check the following things
* `ENV: 'prod'`  in `src/environments/index.js` #Or preprod
* For iOS, you could check in XCODE if Reconnect/Signing & Capabilities/All has the right bundle identifier com.reconnect.CloudSolidaire.prod (or preprod) and the matching provisioning profile
* Set the approproate environment in `fastlane/.env` : `ENV=prod`
* bundle exec fastlane ios deploy --env=preprod
* bundle exec fastlane android deploy --env=preprod
* bundle exec fastlane ios deploy --env=prod
* bundle exec fastlane android deploy --env=prod
