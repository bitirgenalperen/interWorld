import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [uniqueCities, setUniqueCities] = useState([]);
  const [uniqueDistricts, setUniqueDistricts] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/user', { withCredentials: true });
        setUserRole(response.data.role);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        console.error('Failed to fetch user details', error);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/projects', { withCredentials: true });
        setProjects(response.data);
        setFilteredProjects(response.data);

        const cities = [...new Set(response.data.map(project => project.city))].sort();
        setUniqueCities(cities);
        const districts = [...new Set(response.data.map(project => project.district))].sort();
        setUniqueDistricts(districts);
      } catch (error) {
        console.error('Failed to fetch projects', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchUserRole();
    fetchProjects();
  }, []);

  useEffect(() => {
    let updatedProjects = [...projects];

    if (searchTerm) {
      updatedProjects = updatedProjects.filter(project =>
        project.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.estType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (cityFilter) {
      updatedProjects = updatedProjects.filter(project => project.city === cityFilter);
      const districtsForCity = [...new Set(updatedProjects.map(project => project.district))].sort();
      setUniqueDistricts(districtsForCity);
      setDistrictFilter('');
    } else {
      setUniqueDistricts([...new Set(updatedProjects.map(project => project.district))].sort());
    }

    if (districtFilter) {
      updatedProjects = updatedProjects.filter(project => project.district === districtFilter);
    }

    if (minPrice) {
      updatedProjects = updatedProjects.filter(project => project.price >= Number(minPrice));
    }
    if (maxPrice) {
      updatedProjects = updatedProjects.filter(project => project.price <= Number(maxPrice));
    }

    const sizes = updatedProjects.flatMap(project => project.size);
    setAvailableSizes([...new Set(sizes)].sort((a, b) => a - b));

    if (sortOption === 'priceLowToHigh') {
      updatedProjects.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'newest') {
      updatedProjects.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    } else if (sortOption === 'mostFavorited') {
      updatedProjects.sort((a, b) => b.favCount - a.favCount);
    }

    setFilteredProjects(updatedProjects);
  }, [searchTerm, cityFilter, districtFilter, minPrice, maxPrice, sortOption, projects]);

  const handleEdit = (projectId) => {
    console.log(`Edit project ${projectId}`);
  };

  const handleDelete = (projectId) => {
    console.log(`Delete project ${projectId}`);
  };

  const handleDetails = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleBooking = (projectId) => {
    console.log(`Book appointment for project ${projectId}`);
  };

  // Show the loading spinner while data is being fetched
  if (loading) {
    return <LoadingSpinner message="Loading projects, please wait..." />;
  }

  return (
    <div className="container">
      <h2>Projects</h2>
      
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by city, district, or type"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      
      <div className="row mb-3">
        <div className="col">
          <select className="form-select" value={cityFilter} onChange={e => setCityFilter(e.target.value)}>
            <option value="">City</option>
            {uniqueCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <select className="form-select" value={districtFilter} onChange={e => setDistrictFilter(e.target.value)}>
            <option value="">District</option>
            {uniqueDistricts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <select className="form-select" value={sizeFilter} onChange={e => setSizeFilter(e.target.value)}>
            <option value="">Number of Bedrooms</option>
            {availableSizes.map(size => (
              <option key={size} value={size}>
                {size === 0 ? 'Studio' : size === 1 ? '1 Bedroom' : `${size} Bedrooms`}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          <input
            type="number"
            className="form-control"
            placeholder="Min Price"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="number"
            className="form-control"
            placeholder="Max Price"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-3">
        <select className="form-select" value={sortOption} onChange={e => setSortOption(e.target.value)}>
          <option value="">Sort by</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="newest">Newest</option>
          <option value="mostFavorited">Most Favorited</option>
        </select>
      </div>

      <div className="list-group">
        {filteredProjects.map((project) => (
          <div key={project._id} className="list-group-item">
            <h5>{project.city}, {project.district}</h5>
            <p><strong>Type:</strong> {project.estType}</p>
            <p><strong>Size:</strong> {project.size.join(', ')} bedrooms</p>
            <p>{project.description}</p>
            <div className="project-photos">
              {project.photos.map((photo, index) => (
                <img key={index} src={photo} alt={`Project Photo ${index + 1}`} className="img-thumbnail" style={{ width: '100px', marginRight: '10px' }} />
              ))}
            </div>

            <div className="mt-3">
              <button className="btn btn-info mr-2" onClick={() => handleDetails(project._id)}>Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
