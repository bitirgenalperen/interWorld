import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
        const response = await fetch(`http://localhost:5001/api/agents/${agentId}`, { withCredentials: true });
        if (!response.ok) {
          throw new Error("Failed to fetch agent details");
        }
        const data = await response.json();
        setAgent(data);
      } catch (err) {
        setError(err.message);
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
        {agent.fullName}
    </div>
  );
};

export default AgentDetails;
