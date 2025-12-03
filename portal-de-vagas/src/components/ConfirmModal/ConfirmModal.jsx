import react from "react";
import styles from "./ConfirmModal.module.css";

export const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;
  
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h2>{title}</h2>
          <p>{message}</p>
          <div className={styles.modalActions}>
            <button onClick={onCancel}>Cancelar</button>
            <button onClick={onConfirm}>Confirmar</button>
          </div>
        </div>
      </div>
    );
  };
  