import { useState, useEffect } from 'react';
import InitiativeModal from '../modals/InitiativeModal';
import '../../styles/initiatives.css';

const BACKEND_URL = "https://paharpur-backend-adminpanel.onrender.com";

const InitiativesSection = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [selectedInitiative, setSelectedInitiative] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the backend
  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/initiatives`);
        if (!response.ok) {
          throw new Error('Failed to fetch initiatives');
        }
        const data = await response.json();
        setInitiatives(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInitiatives();
  }, []);

  if (loading) {
    return (
      <div className="w-[80%] mx-auto py-8 text-center text-lg text-gray-600">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[80%] mx-auto py-8 text-center text-lg text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="main-box">
      {initiatives.map((initiative, index) => (
        <section key={index} className="touching-lives-section bg-[#d9d9d9] p-10">
          <div className="fast-box">
            {/* Text Content */}
            <div className="text-content">
              <h2 className="text-[20px] italic text-[#cc6600] mb-[10px] leading-[1.2]">
                {initiative.title}<br />
                <span>{initiative.subtitle}</span>
              </h2>
              <p><strong>Location – {initiative.location}</strong></p>
              <p>
                <span>{initiative.tagline}</span><br />
                {initiative.description}
              </p>
              <button
                onClick={() => {
                  setSelectedInitiative(initiative);
                }}
                className="btn btn-primary read-more"
              >
                Read More &gt;&gt;
              </button>
            </div>

            {/* Main Image */}
            <div className="image-content">
              <img
                src={initiative.mainImage}
                alt={initiative.title}
              />
            </div>
          </div>

          {/* Two Image Box */}
          <div className="two-imgbox">
            <div className="imgs">
              {initiative.gallery.slice(0, 2).map((image, index) => (
                <div key={index} className="image-content">
                  <img
                    src={image}
                    alt={`${initiative.title} - Image ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Conditional Modal Rendering */}
      {selectedInitiative && (
        <InitiativeModal
          initiative={selectedInitiative}
          onClose={() => setSelectedInitiative(null)}
        />
      )}
    </div>
  );
};

export default InitiativesSection;
