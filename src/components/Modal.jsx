import { useEffect, useRef } from 'react';

export default function Modal({ children, open, onClose }) {
  const modal = useRef();

  useEffect(() => {
    if (open && modal.current) {
      modal.current.showModal();
    } else {
      if (modal.current) modal.current.close();
    }
  }, [open]);

  function onClick(e) {
    const { current: el } = modal;
    if (e.target === el) onClose();
  }

  return (
    <dialog onClick={onClick} onClose={onClose} ref={modal}>
      {children}
    </dialog>
  );
}
