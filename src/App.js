// import { Component } from 'react';
import { useState, useEffect } from 'react';
import shortid from 'shortid';

import Section from './components/Section';
import Form from './components/Form';
import { Contact, ContactsFilter } from './components/Contact';

import arrContacts from './data/contacts.json';

import s from './App.module.css';

export default function App() {
  const [contacts, setContacts] = useState(arrContacts);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    contacts.find((contact) => contact.name === name)
      ? alert(`${name} is already in contacts`)
      : setContacts([contact, ...contacts]);
  };

  const changeFilter = (e) => {
    setFilter(e.target.value);
  };

  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts
      .filter((contact) =>
        contact.name.toLowerCase().includes(normalizedFilter),
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const visibleContacts = filterContacts();

  const removeContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <Section title={'Phonebook'}>
        <Form onSubmit={addContact} />
      </Section>

      <Section title={'Contacts'}>
        <div className={s.container}>
          <ContactsFilter value={filter} onChange={changeFilter} />
          <Contact contacts={visibleContacts} onDelete={removeContact} />
        </div>
      </Section>
    </>
  );
}
