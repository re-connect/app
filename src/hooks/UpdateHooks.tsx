import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import SpInAppUpdates, { IAUUpdateKind } from 'sp-react-native-in-app-updates';

export const useCheckAndUpdateApp = () => {
  const { t } = useTranslation();
  useEffect(() => {
    const inAppUpdates = new SpInAppUpdates(
      false, // isDebug
    );

    inAppUpdates
      .checkNeedsUpdate()
      .then(result => {
        if (result.shouldUpdate) {
          const updateOptions = Platform.select({
            ios: {
              title: t('ios_app_udpate_available_title'),
              message: t('ios_app_udpate_available_message'),
              buttonUpgradeText: t('update'),
              buttonCancelText: t('cancel'),
            },
            android: {
              updateType: IAUUpdateKind.IMMEDIATE,
            },
          });
          updateOptions && inAppUpdates.startUpdate(updateOptions);
        }
      })
      .catch(error => {
        // Do nothing with the error
        // console.log('inApp update error', error);
      });
  }, []);
};
