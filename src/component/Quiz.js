import React from "react";

export default function Quiz(props){

    const answerProp = props.answeres 
    const selectedAns = props.selectedAnswers
    const correctAnswers = props.correctAnswers
    const correctUserAns = props.correctUserAns 
    const inCorrectUserAns = props.inCorrectUserAns 
    const isChecked = props.isChecked 

    const answerMod = answerProp.map((item)=>{
        const answerId = item.id
        const quizId = props.quizId
        return (<div
                key={answerId}
                onClick={()=>!isChecked?(props.selectHandler(quizId,answerId)) : null}
                style={styleHandler(answerId,quizId,item.answer)}

                className="answer">
                    <p>{item.answer}</p>
                </div>)
    })

    function styleHandler(answerId,quizId,itemAns){
        const selectedStyle = {
            backgroundColor: '#D6DBF5',
            border:' 1.5px solid #D6DBF5'
        }
        const correctStyle = {
            backgroundColor: '#94D7A2',
            border:' 1.5px solid #94D7A2'
        }
        const inCorrectStyle = {
            backgroundColor: '#F8BCBC',
            border:' 1.5px solid #F8BCBC',
            opacity: 0.5
        }
        const remainingAns ={
            opacity: 0.5
        }
        
        if(!isChecked){
           return(selectedAns.some(item=>item.answerId===answerId)?selectedStyle:null)
        }else{
            if(itemAns === correctAnswers[quizId]){
                return correctStyle;
            }else if (inCorrectUserAns.some(item=>item.answerId===answerId)){
                return inCorrectStyle;
            }
            else{
                return remainingAns
            }
        }
        
    }

    const borderStyle = {
     width:" 100%",
     height: "1px",
     visibility: "visible",
     borderBottom:"1px solid rgba(55, 53, 47, 0.16)"
    }
    
    return(
        <div className="quiz">
            <h3>{props.question}</h3>
            <div className="answers-row">
                {[...answerMod]}
            </div>
            <div style={borderStyle} ></div>
        </div>
    )
}