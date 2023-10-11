import { useEffect } from 'react';
import { ModalBox, Overlay } from './Modal.styled';

export const Modal = ({ largeImageURL, closeModal }) => {
  useEffect(() => {
    const handleKeyEscape = evt => {
      if (evt.code !== 'Escape') {
        return;
      }
      closeModal();
    };

    window.addEventListener('keydown', handleKeyEscape);
    return () => {
      window.removeEventListener('keydown', handleKeyEscape);
    };
  }, [closeModal]);

  const closeByOverlay = evt => {
    if (evt.currentTarget !== evt.target) {
      return;
    }

    closeModal();
  };

  return (
    <Overlay onClick={closeByOverlay}>
      <ModalBox>
        <img src={largeImageURL} alt="The same img but large" />
      </ModalBox>
    </Overlay>
  );
};
