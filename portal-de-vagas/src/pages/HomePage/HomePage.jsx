import { useEffect, useState } from 'react';
import JobCard from '../../components/JobCard/JobCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import { getJobs } from '../../services/apiService';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        const jobsData = Array.isArray(response.data) ? response.data : [];
        const sortedJobs = jobsData.sort((a, b) => {
          const dateA = new Date(a.updatedAt || a.createdAt);
          const dateB = new Date(b.updatedAt || b.createdAt);
          return dateB - dateA;
        });
        setJobs(sortedJobs);
        setFilteredJobs(sortedJobs);
      } catch (err) {
        setError('Falha ao carregar as vagas freelance.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const results = jobs.filter((job) =>
      job.title.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredJobs(results);
  };

  const handleFilter = (area) => {
    if (!area) {
      setFilteredJobs(jobs); 
    } else {
      const results = jobs.filter((job) => job.title.toLowerCase().includes(area.toLowerCase()));
      setFilteredJobs(results);
    }
  };

  if (loading) return <p className={styles.message}>Carregando vagas freelance...</p>;
  if (error) return <p className={`${styles.message} ${styles.error}`}>{error}</p>;

  return (
    <main className={styles.homePage}>
      <h2 className={styles.title}>Encontre a sua próxima oportunidade</h2>
      <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
      <div className={styles.jobList}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <p className={styles.message}>Nenhuma vaga encontrada.</p>
        )}
      </div>
    </main>
  );
};

export default HomePage;
