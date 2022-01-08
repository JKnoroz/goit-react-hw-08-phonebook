import { createAction } from '@reduxjs/toolkit';
import shortid from 'shortid';

export const addContact = createAction('phoneBook/addContact', contact => {
  return {
    payload: {
      ...contact,
      id: shortid.generate(),
    },
  };
});
export const deleteContact = createAction('phoneBook/deleteContact');
export const filterContacts = createAction('phoneBook/filter');
