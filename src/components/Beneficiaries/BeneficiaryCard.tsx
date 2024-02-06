import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useGoToBeneficiary } from '../../hooks/BeneficiariesHooks';
import { colors } from '../../style';
import { BeneficiaryInterface } from '../../types/Beneficiaries';
import BeneficiaryCardContent from './BeneficiaryCardContent';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    minHeight: 80,
    marginLeft: 0,
    marginVertical: 2,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
});

interface BeneficiaryCardInterface {
  beneficiary: BeneficiaryInterface;
}

const BeneficiaryCard: React.FC<BeneficiaryCardInterface> = ({ beneficiary }) => {
  const goToBeneficiary = useGoToBeneficiary();

  return (
    <TouchableOpacity style={styles.container} onPress={() => goToBeneficiary(beneficiary)}>
      <BeneficiaryCardContent beneficiary={{ ...beneficiary, ...beneficiary.user, subject_id: beneficiary.id }} />
    </TouchableOpacity>
  );
};

export default BeneficiaryCard;
