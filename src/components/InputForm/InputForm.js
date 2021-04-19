import React, { useState, useCallback } from 'react';
import { getContacts } from '../../redux/phonebook/phonebook-selectors';
import { useSelector, useDispatch } from 'react-redux';
import * as contactsOperations from '../../redux/phonebook/phonebook-operations';
import s from './InputForm.module.css';

export default function InputForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getContacts);

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    if (name === 'name') {
      setName(value);
    }
    if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = useCallback(
    event => {
      const onSubmit = (name, number) => {
        dispatch(contactsOperations.addContact({ name, number }));
      };
      event.preventDefault();
      const sameContact = contacts.find(
        item => item.name.toLowerCase() === name.toLowerCase(),
      );
      const validNumber = number => {
        // eslint-disable-next-line
        return !/^\d[\d\(\)\ -]{4,14}\d$/.test(number);
      };

      if (validNumber(number)) {
        alert('Enter the correct number phone!');
        return;
      }

      if (sameContact) {
        alert(`${name} Already exists`);
        reset();
        return;
      }
      onSubmit(name, number);
      reset();
    },
    [contacts, dispatch, name, number],
  );

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label} htmlFor="name">
        Name
      </label>
      <input
        id="name"
        type="text"
        onChange={handleChange}
        className={s.input}
        name="name"
        value={name}
        placeholder="Name"
        autoComplete="off"
        autoFocus
      />

      <label className={s.label} htmlFor="number">
        Number
      </label>
      <input
        id="number"
        type="text"
        onChange={handleChange}
        className={s.input}
        name="number"
        value={number}
        placeholder="Phone number"
        autoComplete="off"
      />
      <button type="submit" className={s.cybrbtn}>
        <span aria-hidden className={s.cybrbtn__glitch}>
          ADD CONTACT
        </span>
        ADD CONTACT
      </button>
    </form>
  );
}
