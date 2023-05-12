import React from "react"
import Start from "./component/Start";
import Quiz from "./component/Quiz";
import { nanoid } from "nanoid";
import './App.css';
const he = require("he");

function App() {
  const [launch,setLaunch]=React.useState(false)  // start App
  const [quizes,setQuizes]=React.useState([])  //  from API
  const [modifQuizes,setModifQuizes]=React.useState([])  // modified array 
  const [selectedAns,setSelectedAns]=React.useState([])
  const [correctAnswers,setCorrectAnswers]=React.useState([])
  const [isChecked,setIsChecked]=React.useState(false)
  const [correctUserAns,setCorrectUserAns] = React.useState([])
  const [inCorrectUserAns,setInCorrectUserAns] = React.useState([])
  const [playAgian,setPlayAgian]=React.useState(false)

    React.useEffect(()=>{
      let isCanceled=false
      if(!isCanceled){
        fetch('https://opentdb.com/api.php?amount=5&category=17&difficulty=easy&type=multiple')
        .then((data)=>data.json())
        .then((obj)=>obj.results)
        .then((data)=>{setQuizes(data)})
      }
      return()=>{
        isCanceled = true;
      }
    
    },[playAgian])   

    React.useEffect(()=>{
        setModifQuizes(quizes.map(obj =>{
        const allAnswers = obj.incorrect_answers
        allAnswers.splice(Math.round(Math.random()*4),0,obj.correct_answer)
        const modifiAnswers = allAnswers.map((item)=>{
          const nanoId=nanoid()
          return {
          answer:item,
          id:nanoId 
          }})
        return ({
                quizAnswers:modifiAnswers,  
                question: he.decode(obj.question),
                id:quizes.indexOf(obj)
              })
      }))
      setCorrectAnswers(()=> quizes.map((quiz)=>quiz.correct_answer))
    },[quizes])
    
    function selectHandler(quizId,answerId) {
        if(selectedAns.some(item=>item.answerId===answerId)){
          setSelectedAns(()=>{
            const filtered = selectedAns.filter((item)=> item.answerId !== answerId)
            return filtered
          })
        }
        else if (selectedAns.some(item=>item.quizId===quizId)) {
          alert('you already answered')
          return;
        }
        else{
            return setSelectedAns(()=>{
                    for (let i = 0; i < modifQuizes.length; i++) {
                      const quiz = modifQuizes[i];
                      const ans = modifQuizes[i].quizAnswers;
                    
                      if (quiz.id === quizId) {
                          for (let i=0; i < ans.length; i++) {
                            const answer = ans[i];
                            if (answer.id === answerId) {
                              return([...selectedAns,
                                {quizId:quizId,answerId:answerId,answer:answer.answer}])
                              }
                          }
                      }
                    }
            })
        }
      }
      

      React.useEffect(()=>{
        selectedAns.sort((a,b)=>a.quizId - b.quizId)
        setCorrectUserAns(()=>{
            return selectedAns.filter((item)=> item.answer === correctAnswers[selectedAns.indexOf(item)] )
        })
        setInCorrectUserAns(()=>{
            return selectedAns.filter((item)=> item.answer !== correctAnswers[selectedAns.indexOf(item)] )
        })
    },[selectedAns])

      const previewQuizes = modifQuizes.map((obj)=>{
        return <Quiz
        key={Math.random()}
        quizId={obj.id}
        question={obj.question}
        answeres={obj.quizAnswers}
        selectedAnswers = {selectedAns}
        selectHandler = {selectHandler}
        correctAnswers = {correctAnswers}
        correctUserAns={correctUserAns}
        inCorrectUserAns={inCorrectUserAns}
        isChecked={isChecked}
        />
      })


  return (
    <div className="App">
     {!launch &&
      <Start
      startHandler={()=>{setLaunch(true);
       setPlayAgian(false)}}/>}
      {launch &&
       <div className="contianer">
            <div className="quizes">
              {[...previewQuizes]}
            </div>
            <div>
              {!isChecked ?
              <button
              className="check--button"
              onClick={()=>setIsChecked(true)}>Check answers
              </button>
              :
              <div className="score--bar">
                <p>You scored {correctUserAns.length}/5 correct answers</p>
                <button
                className="again--button"
                onClick={()=>{
                  setPlayAgian(true)
                  setLaunch(false)
                  setIsChecked(false)
                  setSelectedAns([])
                  setQuizes([])}}>Play again
                </button>
              </div>
              }
            </div>
      </div>}

    </div>
  );
}

export default App;
