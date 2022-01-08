import { useFetchContactsQuery } from '../../redux/phonebook';
import ContactList from '../ContactList/ContactList';
import Loader from 'react-loader-spinner';

export const ContactsContainer = () => {
  const { data: contacts, isFetching } = useFetchContactsQuery();

  return (
    <div>
      {contacts && <ContactList contacts={contacts} />}
      {isFetching && <Loader />}
    </div>
  );
};
