import * as React from 'react';
import { BeneficiaryInterface } from '../types/Beneficiaries';
import { UserInterface } from '../types/Users';
export interface BeneficiariesContextInterface {
  list: BeneficiaryInterface[];
  current: UserInterface | null;
  setCurrent: (beneficiary: UserInterface | null) => void;
  setList: React.Dispatch<React.SetStateAction<BeneficiaryInterface[]>>;
}

const defaultState: BeneficiariesContextInterface = {
  current: null,
  list: [],
  setCurrent: () => null,
  setList: () => null,
};

const BeneficiaryContext = React.createContext(defaultState);

export default BeneficiaryContext;
