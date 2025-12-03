import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import styles from './ApplyPage.module.css';
import { getJobById } from '../../services/apiService';

const ApplyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', portfolio: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(id);
        setJob(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'O nome é obrigatório.';
    if (!formData.email) {
      newErrors.email = 'O email é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'O email é inválido.';
    }
    if (!formData.portfolio) newErrors.portfolio = 'O link do portfólio é obrigatório.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Formulário enviado:', { jobId: id, ...formData });
      setSubmitted(true);
      setTimeout(() => navigate('/portal-de-vagas'), 3000); 
    }
  };

  if (loading) return <p className={styles.message}>Carregando...</p>;
  if (!job) return <p className={styles.message}>Vaga não encontrada.</p>;

  if (submitted) {
    return (
      <div className={styles.successMessage}>
        <h3>Candidatura enviada com sucesso!</h3>
        <p>Obrigado por se candidatar à vaga de {job.title}.</p>
        <p>Você será redirecionado para a página inicial em breve.</p>
      </div>
    );
  }

  return (
    <main className={styles.applyPage}>
      <div className={styles.jobInfo}>
        <h2 className={styles.jobTitle}>Candidatura para: {job.title}</h2>
        <p>{job.description}</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.applyForm}>
        <h3 className={styles.formTitle}>Preencha seus dados</h3>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nome Completo</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? styles.errorInput : ''}
          />
          {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? styles.errorInput : ''}
          />
          {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="portfolio">Link do Portfólio/GitHub</label>
          <input
            type="url"
            id="portfolio"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            className={errors.portfolio ? styles.errorInput : ''}
          />
          {errors.portfolio && <span className={styles.errorMessage}>{errors.portfolio}</span>}
        </div>
        <button type="submit" className={styles.submitButton}>
          Enviar Candidatura
        </button>
      </form>
    </main>
  );
};

export default ApplyPage;
