import React, { useState, useEffect } from 'react';
import styles from './CurriculumForm.module.css';

const initialFormData = {
  personalInfo: {
    name: '',
    title: '',
    location: '',
    phone: '',
    email: '',
    linkedin: '',
    github: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
};

const CurriculumForm = ({ curriculum, onSave, onCancel }) => {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (curriculum && Object.keys(curriculum).length > 0) {
      const curriculumWithIds = {
        ...curriculum,
        experience: curriculum.experience.map(exp => exp.id ? exp : { ...exp, id: Date.now() + Math.random() }),
        education: curriculum.education.map(edu => edu.id ? edu : { ...edu, id: Date.now() + Math.random() }),
      };
      setFormData(curriculumWithIds);
    } else {
      setFormData(initialFormData);
    }
  }, [curriculum]);

  const handleChange = (e, section, itemId, field) => {
    const { value } = e.target;
    const newData = { ...formData };

    if (section === 'personalInfo') {
      newData.personalInfo[field] = value;
    } else if (section === 'experience' || section === 'education') {
      newData[section] = newData[section].map(item =>
        item.id === itemId ? { ...item, [field]: value } : item
      );
    } else {
      newData[e.target.name] = value;
    }
    setFormData(newData);
  };
  
  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setFormData({ ...formData, skills });
  };

  const addSectionItem = (section) => {
    const newItem = section === 'experience' 
      ? { id: Date.now(), title: '', company: '', period: '', description: '' }
      : { id: Date.now(), institution: '', degree: '', period: '' };
    setFormData({ ...formData, [section]: [...formData[section], newItem] });
  };

  const removeSectionItem = (section, idToRemove) => {
    const items = formData[section].filter(item => item.id !== idToRemove);
    setFormData({ ...formData, [section]: items });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const validateForm = () => {
    const { personalInfo, summary, experience, education, skills } = formData;

    if (!personalInfo.name || !personalInfo.title || !personalInfo.email) {
      alert('Por favor, preencha os campos obrigatórios de Informações Pessoais (Nome, Título, Email).');
      return false;
    }

    if (!summary) {
      alert('Por favor, preencha o campo Resumo.');
      return false;
    }

    if (experience.length > 0) {
      for (const exp of experience) {
        if (!exp.title || !exp.company || !exp.period) {
          alert('Por favor, preencha todos os campos de Experiência (Cargo, Empresa, Período).');
          return false;
        }
      }
    }

    if (education.length > 0) {
      for (const edu of education) {
        if (!edu.institution || !edu.degree || !edu.period) {
          alert('Por favor, preencha todos os campos de Educação (Instituição, Grau, Período).');
          return false;
        }
      }
    }

    if (skills.length === 0 || skills[0] === '') {
      alert('Por favor, adicione pelo menos uma Habilidade.');
      return false;
    }

    return true;
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>{curriculum ? 'Editar Currículo' : 'Adicionar Currículo'}</h2>

      <h3 className={styles.sectionTitle}>Informações Pessoais</h3>
      <div className={styles.formGroup}><label>Nome</label><input type="text" value={formData.personalInfo.name} onChange={(e) => handleChange(e, 'personalInfo', null, 'name')} required /></div>
      <div className={styles.formGroup}><label>Título</label><input type="text" value={formData.personalInfo.title} onChange={(e) => handleChange(e, 'personalInfo', null, 'title')} required /></div>
      <div className={styles.formGroup}><label>Localização</label><input type="text" value={formData.personalInfo.location} onChange={(e) => handleChange(e, 'personalInfo', null, 'location')} /></div>
      <div className={styles.formGroup}><label>Telefone</label><input type="text" value={formData.personalInfo.phone} onChange={(e) => handleChange(e, 'personalInfo', null, 'phone')} /></div>
      <div className={styles.formGroup}><label>Email</label><input type="email" value={formData.personalInfo.email} onChange={(e) => handleChange(e, 'personalInfo', null, 'email')} required /></div>
      <div className={styles.formGroup}><label>LinkedIn</label><input type="text" value={formData.personalInfo.linkedin} onChange={(e) => handleChange(e, 'personalInfo', null, 'linkedin')} /></div>
      <div className={styles.formGroup}><label>GitHub</label><input type="text" value={formData.personalInfo.github} onChange={(e) => handleChange(e, 'personalInfo', null, 'github')} /></div>

      <h3 className={styles.sectionTitle}>Resumo</h3>
      <div className={styles.formGroup}><textarea name="summary" value={formData.summary} onChange={handleChange} required></textarea></div>

      <h3 className={styles.sectionTitle}>Experiência</h3>
      {formData.experience.map((exp) => (
        <div key={exp.id} className={styles.itemGroup}>
          <div className={styles.formGroup}><label>Cargo</label><input type="text" value={exp.title} onChange={(e) => handleChange(e, 'experience', exp.id, 'title')} /></div>
          <div className={styles.formGroup}><label>Empresa</label><input type="text" value={exp.company} onChange={(e) => handleChange(e, 'experience', exp.id, 'company')} /></div>
          <div className={styles.formGroup}><label>Período</label><input type="text" value={exp.period} onChange={(e) => handleChange(e, 'experience', exp.id, 'period')} /></div>
          <div className={styles.formGroup}><label>Descrição</label><textarea value={exp.description} onChange={(e) => handleChange(e, 'experience', exp.id, 'description')}></textarea></div>
          <button type="button" onClick={() => removeSectionItem('experience', exp.id)} className={styles.removeButton}>Remover</button>
        </div>
      ))}
      <button type="button" onClick={() => addSectionItem('experience')} className={styles.addButton}>Adicionar Experiência</button>

      <h3 className={styles.sectionTitle}>Educação</h3>
      {formData.education.map((edu) => (
        <div key={edu.id} className={styles.itemGroup}>
          <div className={styles.formGroup}><label>Instituição</label><input type="text" value={edu.institution} onChange={(e) => handleChange(e, 'education', edu.id, 'institution')} /></div>
          <div className={styles.formGroup}><label>Grau</label><input type="text" value={edu.degree} onChange={(e) => handleChange(e, 'education', edu.id, 'degree')} /></div>
          <div className={styles.formGroup}><label>Período</label><input type="text" value={edu.period} onChange={(e) => handleChange(e, 'education', edu.id, 'period')} /></div>
          <button type="button" onClick={() => removeSectionItem('education', edu.id)} className={styles.removeButton}>Remover</button>
        </div>
      ))}
      <button type="button" onClick={() => addSectionItem('education')} className={styles.addButton}>Adicionar Educação</button>

      <h3 className={styles.sectionTitle}>Habilidades</h3>
      <div className={styles.formGroup}>
        <input type="text" value={formData.skills.join(', ')} onChange={handleSkillsChange} />
        <small>Separe as habilidades por vírgula</small>
      </div>

      <div className={styles.formActions}>
        <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>Salvar</button>
        <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default CurriculumForm;
