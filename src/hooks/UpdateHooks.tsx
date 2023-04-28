import { useEffect } from 'react';
import { Platform } from 'react-native';
import SpInAppUpdates, { NeedsUpdateResponse, IAUUpdateKind, StartUpdateOptions } from 'sp-react-native-in-app-updates';

export const useCheckAndUpdateApp = () => {
  useEffect(() => {
    const inAppUpdates = new SpInAppUpdates(
      true, // isDebug
    );
    // curVersion is optional if you don't provide it will automatically take from the app using react-native-device-info
    inAppUpdates.checkNeedsUpdate({ curVersion: '0.0.8' }).then(result => {
      if (result.shouldUpdate) {
        const updateOptions: StartUpdateOptions = Platform.select({
          ios: {
            title: 'Mise à jour disponible',
            message: "Une nouvelle version de Reconnect est disponible sur l'AppStore, souhaitez-vous l'installer ?",
            buttonUpgradeText: 'Mettre à jour',
            buttonCancelText: 'Annuler',
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
