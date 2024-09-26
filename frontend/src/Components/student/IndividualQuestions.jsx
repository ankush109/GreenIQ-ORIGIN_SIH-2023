import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { finishTest, getQuestionByTestId, startTest, submitIndividual } from '../../api/test'; // Assuming submitAnswers API
import { CgSpinner } from 'react-icons/cg';
import { TextField, Button } from '@mui/material';
import toast from 'react-hot-toast';

function IndividualQuestions() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [start,setstart]=useState(false)
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const getter = async () => {
    setLoading(true);
    try {
      const data = await getQuestionByTestId(id);
      console.log(data, "questions..");
      setQuestions(data.message);

      // Initialize answers state with empty values for each question
      const initialAnswers = {};
      
      setAnswers(initialAnswers);
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast.error("Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getter();
  }, []);

  // Update the answers state for a specific question ID
  const changeAnswerValue = (id, value) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
 const saveIndiAnswer =async (testid,questnId,answer) =>{
    try{    
        const data  = await submitIndividual(questnId,testid,answer);
        console.log(data,"submitted....")
        toast.success("your answer has been saved . . ")
    }catch(err){
        console.log(err,"err")

    }
 }
  // Handle the submission of all answers
  const handleSubmit = async () => {
    console.log("Submitted answers:", answers);
    const res=  await finishTest(id)
    toast.success("Test Submitted...")
  };

  return (
    <div className="base-container py-[5vh]">
      <h1 className="text-3xl font-merri">Answer Questions</h1>
      {!start && (
         <div className='bg-blue-600 w-[200px] text-center p-2 hover:bg-blue-800 cursor-pointer text-white rounded-lg m-4' onClick={()=>{
        startTest(id)
        toast.success("Test Started ")
        setstart(true)
      } }>start test </div>
      ) }
      {start ? (
        <div className="questions-container py-[5vh] w-3/4">
        {!loading ? (
          questions.length > 0 ? (
            questions.map((x,idx) => (
              <div key={x._id} className="question-item mb-4">
               <div className='flex gap-4'>
                <div>Q{idx+1}. </div>  <div className="question-text mb-2">{x.question}</div>
                </div>
          <textarea
  label="Your Answer"
  value={answers[x.id] || ""}
  onChange={(e) => changeAnswerValue(x.id, e.target.value)}
  className="
    w-full 
    min-h-[150px] 
    p-4 
    text-base 
    rounded-lg 
    border 
    border-gray-300 
    shadow-md 
    resize-y 
    outline-none 
    transition 
    focus:border-blue-600 
    focus:ring-0
  "
  placeholder="Type your answer here..."
/>


                <div className='bg-gray-500 w-[150px] text-white p-2' onClick={()=>saveIndiAnswer(x.id,id,answers[x.id])}> Save </div>
              </div>
            ))
          ) : (
            <div>No questions found</div>
          )
        ) : (
          <div className="flex justify-center items-center">
            <CgSpinner className="text-3xl animate-spin" />
          </div>
        )}
        {questions.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            Submit All Answers
          </Button>
        )}
      </div>
      ):"Questions will be visible once you start the test .. "}
    </div>
  );
}

export default IndividualQuestions;
