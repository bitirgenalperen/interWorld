import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProjectDetailsPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/projects/${projectId}`, { withCredentials: true });
        setProject(response.data);
      } catch (error) {
        console.error('Failed to fetch project details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>No project found.</div>;
  }

  return (
    <div className="container">
      <h2>{project.city}, {project.district}</h2>
      <p><strong>Type:</strong> {project.estType}</p>
      <p><strong>Size:</strong> {project.size.join(', ')} bedrooms</p>
      <p>{project.description}</p>
      <h4>Photos</h4>
      <div className="project-photos">
        {project.photos.map((photo, index) => (
          <img key={index} src={photo} alt={`Project Photo ${index + 1}`} className="img-thumbnail" style={{ width: '150px', marginRight: '10px' }} />
        ))}
      </div>
      <h4>Price: £{project.price}</h4>
      <button className="btn btn-primary">Book Appointment</button>
    </div>
  );
};

export default ProjectDetailsPage;
