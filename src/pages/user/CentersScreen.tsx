import * as React from 'react';
import CentersList from '../../components/Centers/CentersList';
import Screen from '../../components/Screen';
import CenterContext from '../../context/CenterContext';
import { useFetchCenters } from '../../hooks/CentersHooks';

const CentersScreen: React.FC = () => {
  const { isFetchingCenters, triggerFetchCenters } = useFetchCenters();
  const { list } = React.useContext(CenterContext);

  return (
    <Screen>
      <CentersList data={list} isFetchingCenters={isFetchingCenters} triggerFetchCenters={triggerFetchCenters} />
    </Screen>
  );
};

export default CentersScreen;
