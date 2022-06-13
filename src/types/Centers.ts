export interface AddressInterface {
  id: number;
  nom: string;
  ville: string;
  code_postal: string;
  pays: string;
  has_been_geocoded: boolean;
}

export interface CenterInterface {
  created_at: Date;
  updated_at: Date;
  id: number;
  nom: string;
  siret: string;
  finess: string;
  adresse: AddressInterface;
}

interface CenterPermissions {
  gestionbeneficiaires: boolean;
  gestionmembres: boolean;
  gestionpaiement: boolean;
}

export interface UserCenterInterface {
  created_at: Date;
  updated_at: Date;
  id: number;
  centre: CenterInterface;
  b_valid: boolean;
  droits: CenterPermissions;
}

export interface CenterCardInterface {
  item: UserCenterInterface;
}

export interface CenterInvitationInterface {
  id: number;
  nom: string;
  code: string;
  siret: string;
  finess: string;
  smsCount: number;
  createdAt: Date;
  updatedAt: Date;
  test: boolean;
}
