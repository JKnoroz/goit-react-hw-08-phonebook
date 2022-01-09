import ContactForm from '../components/ContactForm/ContactForm';
import Filter from '../components/Filter/Filter';
import { ContactsContainer } from '../components/ContactsContainer/ContactsContainer';

export default function ContactsView() {
  return (
    <div className="ContactsView">
      <div>
        <h2>Phonebook</h2>
        <ContactForm />
        <h2>Contacts</h2>
        <Filter />
        <ContactsContainer />
      </div>
    </div>
  );
}
