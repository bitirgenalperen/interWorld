// src/pages/AgentsPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AgentsPage = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/users?role=Agent', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setAgents(data);
        } else {
          console.error('Failed to fetch agents');
        }
      } catch (error) {
        console.error('Error fetching agents', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  if (loading) {
    return <div>Loading agents...</div>;
  }

  return (
    <div className="container">
      <h1>Agents List</h1>
      {agents.length > 0 ? (
        <ul className="list-group">
          {agents.map(agent => (
            <li key={agent._id} className="list-group-item">
              {agent.name} - {agent.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No agents found.</p>
      )}
    </div>
  );
};

export default AgentsPage;
