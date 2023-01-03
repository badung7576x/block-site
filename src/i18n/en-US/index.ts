// This is just an example,
// so you can safely delete all default props below

export default {
  app: {
    name: 'Block & Learn',
  },
  menu: {
    blocksites: 'Block sites',
    studysets: 'Study sets',
    settings: 'Settings',
  },
  pBlocksites: {
    title: 'Block sites',
    inputBlockPlaceholder: 'Input url and enter to add',
    title2: 'Blocked sites',
    noBlockedsites: 'No blocked sites',
    msgErrorUrlExists: 'Url already exists!',
    msgConfirmUnblocksite: 'Do you want to unblock this site?',
    msgSuccessAddBlocksite: 'Add block-site successfully!',
    msgSuccessUnblocksite: 'Remove blocked-site successfully!',
    msgInputInvalid: "Input isn't valid",
    modalSetting: {
      lWebTitle: 'Website title',
      lWebUrl: 'Website URL',
      lBlockTime: 'Block time',
      lBlockDays: 'Block days',
      lAccessable: 'Is it possible to access after study?',
      btnUpdate: 'Update',
      msgErrorTitle: 'Title is required',
      msgErrorUrl: "Url isn't valid",
      msgErrorTime: 'Start time must be before end time',
      msgErrorHasInvalidFeild: 'Please re-enter invalid information',
      msgErrorUrlExists: 'Url already exists!',
    },
  },
  pStudysets: {
    title: 'Study sets',
    btnCreate: 'Create new study set',
    unit: 'terms',
    noStudysets: 'No study sets',
  },
  pCreateStudyset: {
    title: 'Create new study set',
    btnCreate: 'Create',
    terms: 'Terms',
    btnAddNewTerm: 'Add new term',
    btnImport: '+ Import multiple flashcard',
    inputNamePlaceholder: 'Enter study set name',
    inputDescriptionPlaceholder: 'Enter description (optional)',
    modalImport: {
      btnImport: 'Import data',
    },
  },
  pEditStudyset: {
    title: 'Edit study set',
    btnUpdate: 'Update',
  },
  pStudysetDetail: {
    btnDelete: 'Delete',
    btnEdit: 'Edit',
    terms: 'Terms',
    noTerms: 'No terms',
    progress: 'Learning progress',
    msgDeleteStudyset: 'Do you want to delete this study set?',
  },
  pSettings: {
    title: 'Settings',
    btnSave: 'Save',
    lStudyset: 'Study set will study',
    lMaxFlashcards: 'Number of flashcard will study',
  },
};
