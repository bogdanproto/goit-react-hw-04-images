import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { fetchData } from 'API/api';
import { smoothScrool } from 'utils/smoothScroll';
import { AppStyled } from './App.styled';
import { ToastContainer } from 'react-toastify';

export const App = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalImg, setTotalImg] = useState(0);
  const [loading, setLoaded] = useState(false);

  useEffect(() => {
    if (page <= 1) {
      return;
    }
    smoothScrool();
  });

  useEffect(() => {
    if (!query) {
      return;
    }
    const loadData = async () => {
      try {
        setLoaded(true);
        const response = await fetchData(query, page);
        const { hits, totalHits } = response;

        if (!totalHits) {
          toast.info('No results found, try again');
          setLoaded(false);
          return;
        }

        setData(prevState => [...prevState, ...hits]);
        setTotalImg(totalHits);
        setLoaded(false);
      } catch (error) {
        setLoaded(false);
        toast.error('Error downloads');
      }
    };

    loadData();
  }, [page, query]);

  const toSetQuery = query => {
    setQuery(query);
    setData([]);
    setPage(1);
    setTotalImg(0);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <AppStyled>
      <Searchbar getQuery={toSetQuery} />
      <ImageGallery
        imgs={data}
        totalImg={totalImg}
        loadMore={loadMore}
        loading={loading}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AppStyled>
  );
};
