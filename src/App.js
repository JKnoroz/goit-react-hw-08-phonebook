import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';

import './App.css';
import { ContactsContainer } from './components/ContactsContainer/ContactsContainer';

function App() {
  return (
    <div className="App">
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

export default App;
