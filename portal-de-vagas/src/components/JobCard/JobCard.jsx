import React from 'react';
import PropTypes from 'prop-types';
import { MapPin, Briefcase, Trash2, Edit } from 'lucide-react';
import styles from './JobCard.module.css';
import { Link } from 'react-router-dom';

const JobCard = ({ job, isAdmin = false, onDelete, onEdit }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>{job.title}</h3>
        {isAdmin && (
          <div className={styles.adminActions}>
            <button onClick={() => onEdit(job)} className={`${styles.iconButton} ${styles.editButton}`}>
              <Edit size={18} />
            </button>
            <button onClick={() => onDelete(job.id)} className={`${styles.iconButton} ${styles.deleteButton}`}>
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>
      <div className={styles.details}>
        
        <span className={styles.detailItem}>
          <MapPin size={16} /> {job.location}
        </span>
      </div>
      <p className={styles.description}>{job.description}</p>
      {!isAdmin && (
        <Link to={`/portal-de-vagas/apply/${job.id}`} className={styles.applyButton}>
          Candidatar-se
        </Link>
      )}
    </div>
  );
};


export default JobCard;
