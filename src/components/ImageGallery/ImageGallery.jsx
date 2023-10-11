import 'react-toastify/dist/ReactToastify.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryStyled } from './ImageGallery.styled';
import { LoaderStyled } from 'components/Loader/Loader.styled';
import { Button } from 'components/Button/Button';

export const ImageGallery = ({ imgs, totalImg, loadMore, loading }) => {
  return (
    <>
      <ImageGalleryStyled>
        {imgs.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
            />
          );
        })}
      </ImageGalleryStyled>
      {loading && <LoaderStyled />}
      {imgs.length > 0 && imgs.length < totalImg && <Button click={loadMore} />}
    </>
  );
};
