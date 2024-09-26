import React, { useEffect, useState } from "react";
import { mentorTestQuery } from "../../api/test";
import Loading from "../Loading";
import Error from "../Error";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { EyeOpenIcon } from "@radix-ui/react-icons";

function Mentortest() {
  const { data, isLoading, isError } = mentorTestQuery();
  const [test, setTest] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (data) {
      setTest(data);
    }
  }, [data]);

  const filteredTests = test?.filter((item) =>
    item.subject.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (isError) {
    return <Error />;
  }

  return (
    <div className="base-container py-[5vh]">
      <h1 className="text-3xl font-merri mb-5">Your Created Tests</h1>

      {isLoading ? (
        <Loading />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Subject</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTests.length > 0 ? (
                filteredTests.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item?.subject?.name ? item?.subject?.name : "Physics"}
                    </TableCell>
                    <TableCell>
                      {item?.title ? item?.title : "test on heat"}
                    </TableCell>
                    <TableCell>
                      {new Date(item?.createdAt).toLocaleDateString(
                        "en-US",
                        options
                      )}
                    </TableCell>
                    <TableCell>
                      {item.class.name ? item.class.name : "11"}
                    </TableCell>
                    <TableCell>
                      <Link to={`/mentor/submission/${item.id}`}>
                        <EyeOpenIcon />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No tests found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default Mentortest;
