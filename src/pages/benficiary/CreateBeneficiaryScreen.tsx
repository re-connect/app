import * as React from 'react';
import CreateBeneficiaryForm from '../../components/Beneficiaries/Create/CreateBeneficiaryForm';
import Screen from '../../components/Screen';

const CreateBeneficiaryScreen: React.FC = () => {
  return (
    <Screen>
      <CreateBeneficiaryForm />
    </Screen>
  );
};

export default CreateBeneficiaryScreen;
