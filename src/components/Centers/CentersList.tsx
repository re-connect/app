import * as React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { colors } from '../../style';
import { CenterCardInterface, UserCenterInterface } from '../../types/Centers';
import CenterCard from './CenterCard';

interface Props {
  data: UserCenterInterface[];
  isFetchingCenters: boolean;
  triggerFetchCenters: () => Promise<void>;
}

const CentersList: React.FC<Props> = ({ data, isFetchingCenters, triggerFetchCenters }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item: UserCenterInterface): string => item.centre.id.toString()}
      refreshControl={
        <RefreshControl
          refreshing={isFetchingCenters}
          onRefresh={triggerFetchCenters}
          tintColor={colors.white}
          enabled
        />
      }
      renderItem={({ item }: CenterCardInterface) => {
        return <CenterCard center={item} />;
      }}
    />
  );
};

export default CentersList;
