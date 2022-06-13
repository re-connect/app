import { CenterInterface, UserCenterInterface } from '../types/Centers';

export const basicCenter: CenterInterface = {
  created_at: new Date('2015-07-02T14:50:39+0200'),
  updated_at: new Date('2015-07-02T14:50:39+0200'),
  id: 44,
  nom: 'CHU RECONNECT',
  siret: '000000000',
  finess: '00000000000000',
  adresse: {
    id: 592,
    nom: '63 rue des cascades',
    ville: 'Paris',
    code_postal: '75020',
    pays: 'France',
    has_been_geocoded: true,
  },
};
export const basicCenter2: CenterInterface = {
  created_at: new Date('2015-07-02T14:50:39+0200'),
  updated_at: new Date('2015-07-02T14:50:39+0200'),
  id: 45,
  nom: 'CHRS RECONNECT',
  siret: '000000000',
  finess: '00000000000000',
  adresse: {
    id: 592,
    nom: '63 rue des cascades',
    ville: 'Paris',
    code_postal: '75020',
    pays: 'France',
    has_been_geocoded: true,
  },
};

export const basicBeneficiaryCenter: UserCenterInterface = {
  centre: basicCenter,
  b_valid: true,
  created_at: new Date(),
  updated_at: new Date(),
  id: 1,
  droits: {
    gestionbeneficiaires: true,
    gestionmembres: true,
    gestionpaiement: true,
  },
};

export const basicBeneficiaryCenter2: UserCenterInterface = {
  centre: basicCenter2,
  b_valid: false,
  created_at: new Date(),
  updated_at: new Date(),
  id: 1,
  droits: {
    gestionbeneficiaires: true,
    gestionmembres: true,
    gestionpaiement: true,
  },
};

export const basicCenters = [basicBeneficiaryCenter, basicBeneficiaryCenter2];
