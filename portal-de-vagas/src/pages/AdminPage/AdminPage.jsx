import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../../services/apiService";
import JobCard from "../../components/JobCard/JobCard";
import JobForm from "../../components/JobForm/JobForm";
import styles from "./AdminPage.module.css";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";

const AdminPage = () => {
  const { isAuthenticated, loadingUser } = useAuth();
  const navigate = useNavigate();
  console.log(isAuthenticated);

  useEffect(() => {
    if (!loadingUser && !isAuthenticated) {
      navigate("/portal-de-vagas");
    }
  }, [isAuthenticated, navigate]);

  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [deletingJob, setDeletingJob] = useState(null)
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await getJobs();
      console.log("[AdminPage] API Response:", response);

      const jobsData = Array.isArray(response.data) ? response.data : [];
      const sortedJobs = jobsData.sort((a, b) => {
        const dateA = new Date(a.updatedAt || a.createdAt);
        const dateB = new Date(b.updatedAt || b.createdAt);
        return dateB - dateA;
      });
      setJobs(sortedJobs);
    } catch (err) {
      setError("Falha ao carregar as vagas freelance.");
      console.error("[AdminPage] Fetch Error:", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchJobs();
    }
  }, [isAuthenticated]);

  const handleDelete = async (id) => {
      try {
        await deleteJob(id);
        fetchJobs();
        setModalOpen(false)
      } catch (err) {
        setError("Falha ao deletar a vaga.");
        console.error(err);
      }
  };



  const handleEdit = (job) => {
    setEditingJob(job);
    setIsFormVisible(true);
  };

  const handleSave = async (jobData) => {
    try {
      if (editingJob) {
        await updateJob(editingJob.id, jobData);
      } else {
        await createJob(jobData);
      }
      fetchJobs();
      handleCancel();
    } catch (err) {
      setError("Falha ao salvar a vaga.");
      console.error(err);
    }
  };

  const handleCancel = () => {
    setEditingJob(null);
    setIsFormVisible(false);
  };

  const showCreateForm = () => {
    setEditingJob(false);
    setIsFormVisible(true);
  };

  console.log("[AdminPage] Rendering with jobs state:", jobs);

  if (loading) return <p className={styles.message}>Carregando...</p>;
  if (error)
    return <p className={`${styles.message} ${styles.error}`}>{error}</p>;

  return (
    <main className={styles.adminPage}>
      <div className={styles.header}>
        <h2 className={styles.title}>Gerenciar Vagas Freelance</h2>
        <button onClick={showCreateForm} className={styles.createButton}>
          Criar Nova Vaga
        </button>
      </div>

      {isFormVisible && (
        <div className={styles.jobFormWrapper}>
          <JobForm job={editingJob} onSave={handleSave} onCancel={handleCancel} />
        </div>
      )}

      <div className={styles.jobList}>
        {Array.isArray(jobs) && jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className={styles.jobCardWrapper}>
              <JobCard
                job={job}
                isAdmin={true}
                onDelete={() =>{ setModalOpen(true) 
                  setDeletingJob (job)
                }}
                onEdit={() => handleEdit(job)}
              />
              {editingJob && editingJob.id === job.id && isFormVisible && (
                <div className={styles.jobFormWrapper}>
                  <JobForm
                    job={editingJob}
                    onSave={handleSave}
                    onCancel={handleCancel}
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <p className={styles.message}>Nenhuma vaga cadastrada.</p>
        )}
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        title="Confirmar Ação"
        message="Você tem certeza que deseja deletar este item?"
        onConfirm={()=> handleDelete(deletingJob.id)}
        onCancel={() => setModalOpen(false)}
      />
    </main>
  );
};

export default AdminPage;
