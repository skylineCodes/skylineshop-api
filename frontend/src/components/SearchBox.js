import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  const clickHandler = (keyword) => {
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <>
      <Form onSubmit={submitHandler} className='search-header'>
        <div class='form-group-div'>
          <input
            class='search-input'
            type='text'
            name='q'
            placeholder='Search Products'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <a type='submit' onClick={() => clickHandler(keyword)}>
            <i class='fas fa-search'></i>
          </a>
        </div>
      </Form>
    </>
  );
};

export default SearchBox;
