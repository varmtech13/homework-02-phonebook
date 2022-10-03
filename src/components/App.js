import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Phonebook, AddBlock, ContactBlock, Title } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleFilterChange = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  findName = name => {
    const { contacts } = this.state;
    const normalizedName = name.toLowerCase();

    return contacts.find(
      contact => contact.name.toLowerCase() === normalizedName
    );
  };

  addContact = ({ id, name, number }) => {
    const checkContact = this.findName(name);
    const { contacts } = this.state;

    if (checkContact) {
      alert(`${name} is already in contacts`);
      return;
    }

    const lastElement = contacts.length;
    const contact = {
      id: 'id-' + (lastElement + 1),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [...contacts, contact],
    }));
  };

  handleRemove = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  getContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;

    return (
      <Phonebook>
        <AddBlock>
          <Title>Phonebook</Title>
          <ContactForm onSubmit={this.addContact} />
        </AddBlock>
        <ContactBlock>
          <Title>Contacts</Title>
          <Filter onChange={this.handleFilterChange} value={filter} />
          <ContactList
            contacts={this.getContacts()}
            onRemoveContact={this.handleRemove}
          />
        </ContactBlock>
      </Phonebook>
    );
  }
}
