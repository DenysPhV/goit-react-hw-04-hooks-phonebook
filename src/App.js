import { Component } from 'react';
import shortid from 'shortid';

import Section from './components/Section';
import Form from './components/Form';
import { Contact, ContactsFilter } from './components/Contact';

import arrContacts from './data/contacts.json';

import s from './App.module.css';

class App extends Component {
  state = {
    contacts: arrContacts,
    filter: '',
  };

  componentDidMount() {
    const contactsSave = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contactsSave);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    contacts.find((contact) => contact.name === name)
      ? alert(`${name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [contact, ...contacts],
        }));
  };

  removeContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId,
      ),
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.target.value });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts
      .filter((contact) =>
        contact.name.toLowerCase().includes(normalizedFilter),
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  render() {
    // const { contacts } = this.state;
    const { filter } = this.state;
    const visibleContacts = this.filterContacts();
    return (
      <>
        <Section title={'Phonebook'}>
          <Form onSubmit={this.addContact} />
        </Section>

        <Section title={'Contacts'}>
          <div className={s.container}>
            <ContactsFilter value={filter} onChange={this.changeFilter} />
            <Contact contacts={visibleContacts} onDelete={this.removeContact} />
          </div>
        </Section>
      </>
    );
  }
}
export default App;
