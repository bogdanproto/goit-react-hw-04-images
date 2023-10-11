import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Header } from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

export const Searchbar = ({ getQuery }) => {
  const { register, handleSubmit } = useForm();
  const [prevQuery, setPrevQuery] = useState('');

  const submitForm = ({ query }) => {
    if (!query) {
      toast.info('Please text your query');
      return;
    }

    if (prevQuery === query) {
      toast.info('This query has done');
      return;
    }

    setPrevQuery(query);

    getQuery(query.toLowerCase());
  };

  return (
    <Header>
      <form onSubmit={handleSubmit(submitForm)}>
        <button type="submit">
          <FaSearch />
        </button>

        <input
          {...register('query')}
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </Header>
  );
};
