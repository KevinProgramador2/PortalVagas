import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./JobForm.module.css";

const JobForm = ({ job, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    contractType: "Freelance",
  });

  useEffect(() => {
    if (job) {
      setFormData(job);
    } else {
      setFormData({
        title: "",
        location: "",
        description: "",
        contractType: "Freelance",
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const locationOptions = ["Remoto", "Presencial"];

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>
        {job ? "Editar Vaga" : "Criar Nova Vaga"}
      </h2>
      <div className={styles.formGroup}>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="location">Localização</label>
        <select
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        >
          <option value="">Selecione a Localidade</option>
          {locationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="contractType">Tipo de Contrato</label>
        <select
          id="contractType"
          name="contractType"
          value={formData.contractType}
          onChange={handleChange}
          required
        >
          <option value="Freelance">Freelance</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>
      </div>
      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.saveButton}>
          Salvar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={styles.cancelButton}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default JobForm;
