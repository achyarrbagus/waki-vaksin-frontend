import React, { useState, useEffect } from "react";

import { getLastAnak } from "../data";

const DetailAnakAfterSubmit = () => {
  const [anak, setAnak] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      const anak = await getLastAnak();

      // const filteredFlights = flights.filter((item) => item.Status === null);

      setAnak(anak);
      setLoading(false);
    };
    getStats();
  }, []);

  return (
    <div className="detail-anak">
      {anak.name}
      {anak.gender}
      {anak.dateofbirth}
    </div>
  );
};

export default DetailAnakAfterSubmit;
