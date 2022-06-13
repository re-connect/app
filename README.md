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
