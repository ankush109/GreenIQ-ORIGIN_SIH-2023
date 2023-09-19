import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Leftbar from "../Leftbar";
import { getmaterial } from "../../api/material";
import { toast } from "react-hot-toast";

function MaterialSubject() {
  const [material, setMaterial] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { id } = useParams();

  const fetchMaterial = async () => {
    try {
      const response = await getmaterial(id);
      console.log(id, "subject name");

      setMaterial(response);
      console.log(response, "mat");
      if (!response.success) {
        setMaterial([]);
      } else {
        setMaterial(response.message);
        console.log(response.message, "me");
      }
      setLoading(false); // Set loading to false once data is received
    } catch (error) {
      console.error("Error fetching material:", error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    fetchMaterial();
  }, [id]);

  return (
    <div className="max-w-screen max-h-screen flex overflow-hidden">
      <div className="w-1/4 h-screen">
        <Leftbar />
      </div>
      <div className="p-4 w-3/4 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Material for {id}</h2>
        <div className="">
          {loading ? ( // Display loading state while fetching data
            <div>Loading...</div>
          ) : material?.length > 0 ? (
            material?.map((mat) => (
              <div
                key={mat.id}
                className="border rounded-lg shadow-lg bg-white p-4 hover:bg-gray-100"
              >
                <h3 className="text-xl font-semibold">{mat.title}</h3>
                <p className="mt-2 text-gray-600">{mat.content}</p>
              </div>
            ))
          ) : (
            <div>
              <h1>No materials found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MaterialSubject;
