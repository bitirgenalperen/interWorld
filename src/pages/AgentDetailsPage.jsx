import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';


const AgentDetails = () => {
  const { agentId } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch agent details
    const fetchAgent = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/agents/${agentId}`, { withCredentials: true });
        
        // Check if the request was successful (HTTP status code 2xx)
        if (response.status < 200 || response.status >= 300) {
          throw new Error("Failed to fetch agent details");
        }
  
        console.log(response.data); // Correct way to access the data
        setAgent(response.data);   // Set the fetched agent details to state
      } catch (err) {
        console.error("Error fetching agent:", err); // Log the exact error for debugging
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
  
    fetchAgent();
  }, [agentId]);
  

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;
  if (!agent) return <div className="text-center mt-5">No details found.</div>;

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
        Back
      </button>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{agent.fullName}</h2>
          <p className="card-text">
            <strong>Email:</strong> {agent.email}
          </p>
          <p className="card-text">
            <strong>Phone:</strong> {agent.mobilePhone || "N/A"}
          </p>
          <p className="card-text">
            <strong>Communication Preference:</strong> {agent.comPref || "N/A"}
          </p>
          <p className="card-text">
            <strong>Role:</strong> {agent.role}
          </p>
          <p className="card-text">
            <strong>Languages:</strong>
            <div className="d-flex flex-wrap mt-2">
              {agent.languages?.length > 0 ? (
                agent.languages.map((lang) => (
                  <div
                    key={lang}
                    className="d-flex align-items-center me-2 mb-2"
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/${lang}.png`}
                      alt={lang}
                      className="language-icon"
                    />
                    <span className="ms-1">{lang}</span>
                  </div>
                ))
              ) : (
                <span>N/A</span>
              )}
            </div>
          </p>
          <p className="card-text">
            <strong>Favorites:</strong> {agent.favorites?.length || 0} projects
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
