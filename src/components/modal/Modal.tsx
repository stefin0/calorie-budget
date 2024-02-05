import Style from "./Modal.module.css";

type ModalProps = {
  handleSetShowModal: () => void;
};

function Modal({ handleSetShowModal }: ModalProps) {
  return (
    <div className={Style.modal}>
      <div className={Style.overlay} onClick={handleSetShowModal}></div>
      <div className={Style.content}>
        <button className={Style.close} onClick={handleSetShowModal}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
