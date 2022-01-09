import ContactForm from '../components/ContactForm/ContactForm';
import Filter from '../components/Filter/Filter';
import { ContactsContainer } from '../components/ContactsContainer/ContactsContainer';

export default function ContactsView() {
  return (
    <div className="ContactsView">
      <div>
        <h1>Phonebook</h1>
        <ContactForm />
        <h2>Contacts</h2>
        <Filter />
        <ContactsContainer />
      </div>
    </div>
  );
}
