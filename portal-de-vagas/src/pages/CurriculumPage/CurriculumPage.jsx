import React, { useState, useEffect } from "react";
import styles from "./CurriculumPage.module.css";
import {
  getCurriculum,
  createCurriculum,
  updateCurriculum,
  deleteCurriculum,
} from "../../services/apiService";
import { useAuth } from "../../contexts/AuthContext";
import CurriculumForm from "../../components/CurriculumForm/CurriculumForm";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";

const CurriculumPage = () => {
  const [curriculumData, setCurriculumData] = useState(null);
  const [editingCurriculum, setEditingCurriculum] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const { isUserAuthenticated } = useAuth();


  const fetchCurriculum = async () => {
    if (isUserAuthenticated) {
      try {
        const response = await getCurriculum();

        if (response.data && response.data.length > 0 && response.data[0].id) {
          setCurriculumData(response.data[0]);
        } else {
          setCurriculumData(null);
        }
      } catch (error) {
        console.error("Erro ao buscar currículo:", error);
        setCurriculumData(null);
      }
    }
  };

  useEffect(() => {
    fetchCurriculum();
  }, [isUserAuthenticated]);

  const handleSave = async (formData) => {
    try {
      if (curriculumData) {
        await updateCurriculum(curriculumData.id, formData);
      } else {
        await createCurriculum(formData);
      }
      fetchCurriculum();
      setEditingCurriculum(false);
    } catch (error) {
      console.error("Erro ao salvar currículo:", error);
    }
  };

  const handleDelete = async () => {
      try {
        if (curriculumData && curriculumData.id) {
          await deleteCurriculum(curriculumData.id);
          setCurriculumData(null);
        } else {
          console.warn(
            "Não foi possível deletar: curriculumData ou curriculumData.id é indefinido."
          );
        }
      } catch (error) {
        console.error("Erro ao deletar currículo:", error);
      }
  };

  if (!isUserAuthenticated) {
    return <p>Você precisa estar logado para ver seu currículo.</p>;
  }

  if (editingCurriculum) {
    return (
      <CurriculumForm
        curriculum={curriculumData}
        onSave={handleSave}
        onCancel={() => setEditingCurriculum(false)}
      />
    );
  }

  if (!curriculumData) {
    return (
      <div className={styles.container}>
        <h1>Meu Currículo</h1>
        <p>Nenhum currículo encontrado.</p>
        <button
          onClick={() => setEditingCurriculum(true)}
          className={`${styles.btn} ${styles.btnPrimary}`}
        >
          Inserir Currículo
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Meu Currículo</h1>
      {curriculumData ? (
        <div className={styles.curriculumCard}>
          <header className={styles.header}>
            <h1>{curriculumData.personalInfo.name}</h1>
            <h2>{curriculumData.personalInfo.title}</h2>
            <p>
              {curriculumData.personalInfo.location} |{" "}
              {curriculumData.personalInfo.phone} |{" "}
              {curriculumData.personalInfo.email}
            </p>
            <p>
              <a
                href={`https://${curriculumData.personalInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>{" "}
              |
              <a
                href={`https://${curriculumData.personalInfo.github}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </p>
          </header>

          <section className={styles.section}>
            <h3>Resumo</h3>
            <p>{curriculumData.summary}</p>
          </section>

          <section className={styles.section}>
            <h3>Experiência</h3>
            {curriculumData.experience.map((job, index) => (
              <div key={index} className={styles.job}>
                <h4>{job.title}</h4>
                <p>
                  <strong>{job.company}</strong> | {job.period}
                </p>
                <p>{job.description}</p>
              </div>
            ))}
          </section>

          <section className={styles.section}>
            <h3>Educação</h3>
            {curriculumData.education.map((edu, index) => (
              <div key={index} className={styles.education}>
                <h4>{edu.institution}</h4>
                <p>
                  {edu.degree} | {edu.period}
                </p>
              </div>
            ))}
          </section>

          <section className={styles.section}>
            <h3>Habilidades</h3>
            <ul className={styles.skills}>
              {curriculumData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </section>

          <div className={styles.actions}>
            <button
              onClick={() => setEditingCurriculum(true)}
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              Editar
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className={`${styles.btn} ${styles.btnDanger}`}
            >
              Deletar
            </button>
          </div>
          <ConfirmModal
        isOpen={isModalOpen}
        title="Confirmar Ação"
        message="Você tem certeza que deseja deletar este item?"
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
        />
        </div>
      ) : (
        <p>Nenhum currículo encontrado.</p>
      )}
    </div>
  );
};

export default CurriculumPage;
