import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions';
import { getFilter } from '../../redux/selectors';
import s from './Filter.module.css';

function Filter() {
  const filterValue = useSelector(getFilter);
  const dispatch = useDispatch();
  const changeFilter = e => dispatch(actions.filterContacts(e.target.value));

  return (
    <label className={s.label}>
      Filter{' '}
      <input
        type="text"
        className={s.input}
        name="filter"
        value={filterValue}
        onChange={changeFilter}
      />
    </label>
  );
}

export default Filter;
