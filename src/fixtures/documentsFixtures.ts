import { DocumentInterface } from '../types/Documents';

export const basicDocument: DocumentInterface = {
  id: 1,
  b_prive: false,
  created_at: '2019-06-28T11:06:00+0200',
  nom: 'Gandalf Id card',
  updated_at: '2019-06-28T11:06:00+0200',
  is_folder: false,
  beneficiaire: {
    id: 5590,
  },
};

export const basicDocumentInFolder: DocumentInterface = {
  id: 82980,
  b_prive: false,
  nom: 'gandalf-driving-licente.jpg',
  created_at: '2019-07-01T13:46:55+0200',
  updated_at: '2019-07-01T13:56:43+0200',
  extension: 'jpg',
  url: '/api/documents/82980',
  thumb: '/api/documents/82980/small',
  big_thumb: '/api/documents/82980/thumbnails',
  is_folder: false,
  folder_id: 4850,
  beneficiaire: {
    id: 5590,
  },
};

export const folderDocuments = [
  {
    id: 82979,
    b_prive: false,
    nom: 'gandalf-id.jpg',
    created_at: '2019-07-01T13:46:55+0200',
    updated_at: '2019-07-01T13:56:40+0200',
    extension: 'jpg',
    url: '/api/documents/82979',
    thumb: '/api/documents/82979/small',
    big_thumb: '/api/documents/82979/thumbnails',
    is_folder: false,
    folder_id: 4850,
    beneficiaire: {
      id: 5590,
    },
  },
  basicDocumentInFolder,
  {
    id: 82981,
    b_prive: false,
    nom: 'gandalf-driving-licente.jpg',
    created_at: '2019-07-01T13:46:55+0200',
    updated_at: '2019-07-01T13:56:43+0200',
    extension: 'jpg',
    url: '/api/documents/82980',
    thumb: '/api/documents/82980/small',
    big_thumb: '/api/documents/82980/thumbnails',
    is_folder: false,
    beneficiaire: {
      id: 5590,
    },
  },
];

export const folder: DocumentInterface = {
  id: 4850,
  b_prive: false,
  nom: 'SuperFolder',
  created_at: '2019-07-01T13:48:54+0200',
  updated_at: '2019-07-01T13:56:43+0200',
  documents: folderDocuments,
  dossier_image: '',
  is_folder: true,
  beneficiaire: {
    id: 5590,
  },
};

export const documentsList: DocumentInterface[] = [
  {
    id: 82978,
    b_prive: false,
    nom: 'frodon-security-card.jpg',
    created_at: '2019-07-01T13:46:55+0200',
    updated_at: '2019-07-01T13:46:55+0200',
    extension: 'jpg',
    url: '/api/documents/82978',
    thumb: '/api/documents/82978/small',
    big_thumb: '/api/documents/82978/thumbnails',
    is_folder: false,
    beneficiaire: {
      id: 5590,
    },
  },
  {
    id: 82924,
    b_prive: false,
    nom: 'frodon-ring-ownership-certificate.jpg',
    created_at: '2019-06-24T10:28:39+0200',
    updated_at: '2019-06-28T18:40:54+0200',
    extension: 'jpg',
    url: '/api/documents/82924',
    thumb: '/api/documents/82924/small',
    big_thumb: '/api/documents/82924/thumbnails',
    is_folder: false,
    beneficiaire: {
      id: 5590,
    },
  },
];

export const documentsAndFoldersList: DocumentInterface[] = [...documentsList, folder];
