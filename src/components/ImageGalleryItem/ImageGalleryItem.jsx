import { useState } from 'react';
import { ImageItem } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(prevState => !prevState);

  return (
    <>
      <ImageItem onClick={toggleModal}>
        <img src={webformatURL} alt={tags} />
      </ImageItem>
      {isModalOpen && (
        <Modal largeImageURL={largeImageURL} closeModal={toggleModal} />
      )}
    </>
  );
};
