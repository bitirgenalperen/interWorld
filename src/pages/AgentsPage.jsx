import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AgentsPage.css';

const AgentsPage = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/agents', { credentials: 'include' });
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
    <div className="container mt-4">
      <h1 className="text-center mb-4">Agents List</h1>
      <div className="row">
        {agents.length > 0 ? (
          agents.map((agent) => (
            <div key={agent._id} className="col-md-4 mb-4">
              <div className="card agent-card">
                <div className="card-body">
                  <h5 className="card-title">{agent.fullName}</h5>
                  <p className="card-text">
                    <strong>Email:</strong> {agent.email}
                  </p>
                  <p className="card-text">
                    <strong>Phone:</strong> {agent.mobilePhone || 'N/A'}
                  </p>
                  <p className="card-text">
                    <strong>Languages:</strong> {agent.languages?.join(', ') || 'N/A'}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/agents/${agent._id}`)}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No agents found.</p>
        )}
      </div>
    </div>
  );
};

export default AgentsPage;
