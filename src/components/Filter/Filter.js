import React from 'react';
import { getFilter } from '../../redux/phonebook/phonebook-selectors';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/phonebook/phonebook-actions';
import s from './Filter.module.css';

export default function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const onInputChange = event => {
    return dispatch(actions.changeFilter(event.target.value));
  };

  return (
    <div className={s.wrapper}>
      <label className={s.label}>
        Find by Name
        <input
          className={s.input}
          type="text"
          value={filter}
          onChange={onInputChange}
        />
      </label>
    </div>
  );
}
