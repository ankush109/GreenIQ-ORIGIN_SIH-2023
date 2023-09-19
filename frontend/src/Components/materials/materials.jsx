import React, { useEffect, useState } from "react";
import { getSubjectsQuery } from "../../api/material";

function materials() {
  const data = getSubjectsQuery();
  const [subjects, setsubjects] = useState([]);
  useEffect(() => {
    setsubjects(data);
  });
  return <div>materials</div>;
}

export default materials;
