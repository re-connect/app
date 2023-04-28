import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import SpInAppUpdates, { NeedsUpdateResponse, IAUUpdateKind, StartUpdateOptions } from 'sp-react-native-in-app-updates';

export const useCheckAndUpdateApp = () => {
  const { t } = useTranslation();
  useEffect(() => {
    const inAppUpdates = new SpInAppUpdates(
      true, // isDebug
    );
    // curVersion is optional if you don't provide it will automatically take from the app using react-native-device-info
    inAppUpdates.checkNeedsUpdate({ curVersion: '0.0.8' }).then(result => {
      if (result.shouldUpdate) {
        const updateOptions: StartUpdateOptions = Platform.select({
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
        inAppUpdates.startUpdate(updateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
      }
    });
  }, []);
};
