import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Bog kooban oo la geeyo si toos ah foomka codsiga (/apply) isagoo sitaa scholarshipId
// Waxaa loo isticmaalaa marka lagu boodo '/apply-scholarship/:id' halkii la isticmaali lahaa Link state
const ApplyScholarship = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/apply', { replace: true, state: { scholarshipId: id } });
  }, [id, navigate]);

  return null;
};

export default ApplyScholarship;
