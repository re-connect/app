import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';
import BeneficiariesList from '../components/Beneficiaries/BeneficiariesList';
import Screen from '../components/Screen';
import IconButton from '../components/UI/IconButton';
import BeneficiaryContext from '../context/BeneficiaryContext';
import { useFetchBeneficiaries } from '../hooks/BeneficiariesHooks';

const BeneficiariesScreen: React.FC = () => {
  const { isFetchingBeneficiaries, triggerFetchBeneficiaries } = useFetchBeneficiaries();
  const navigation = useNavigation<any>();
  const { list } = React.useContext(BeneficiaryContext);

  return (
    <Screen>
      <View style={{ position: 'absolute', right: 16, bottom: 16, zIndex: 1 }}>
        <IconButton size={60} iconName='plus' onPress={() => navigation.navigate('CreateBeneficiary')} />
      </View>
      <BeneficiariesList
        list={list}
        isFetchingBeneficiaries={isFetchingBeneficiaries}
        triggerFetchBeneficiaries={triggerFetchBeneficiaries}
      />
    </Screen>
  );
};

export default BeneficiariesScreen;
