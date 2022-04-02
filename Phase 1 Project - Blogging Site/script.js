const questionContainer = document.getElementById("questionContainer");
const questionTitle = document.getElementById("questionTitle");
const questionDescription = document.getElementById("questionDescription");
const askQuestion = document.getElementById("askQuestion");
const questionListContainer = document.getElementById("questionListContainer");
const questionDisplay = document.getElementById("questionDisplay");

const answerFormContainer = document.getElementById("answerFormContainer");
const nameCommentator = document.getElementById("nameCommentator");
const answerCommentator = document.getElementById("answerCommentator");
const submitAnswer = document.getElementById("submitAnswer");

const search = document.getElementById("search");
const div_header = document.getElementById("div_header");
const footer = document.getElementById("foot");

const newQuestion = document.getElementById("newQuestion");

const QUESTIONS = "questions";

let allQuestions = [];

let selectedQuestion = null;

function createListAtStartup()
{
  let questions = localStorage.getItem(QUESTIONS) ;

  if(questions)
  {
    questions = JSON.parse(questions);
  }
  else
  {
    questions = [];
  }

  allQuestions = questions

  questions.forEach(function(question)
  { 
    addToUI(question)
  });
} 

createListAtStartup();


askQuestion.addEventListener("click", function()
{
  const title = questionTitle.value;
  const description = questionDescription.value;

  const newQuestionStructure = {
    title: title,
    description: description,
    answers: []
  }

  let questions = localStorage.getItem(QUESTIONS) ;

  if(questions)
  {
    questions = JSON.parse(questions);
  }
  else
  {
    questions = [];
  }

  questions.push(newQuestionStructure);

  localStorage.setItem(QUESTIONS, JSON.stringify(questions));

  addToUI(newQuestionStructure);

  questionTitle.value = "";
  questionDescription.value = "";

})


function addToUI(question)
{
  const container = document.createElement("div");
  container.classList.add("question")

  const title = document.createElement("h3");
  const description = document.createElement("p");

  container.addEventListener("click", function()
  {
    handleQuestionClick(question);
  })

  title.innerHTML = question.title;
  description.innerHTML = question.description;

  container.appendChild(title);
  container.appendChild(description);

  questionListContainer.appendChild(container);
  var hrLine = document.createElement("hr");
  questionListContainer.appendChild(hrLine);


}

function handleQuestionClick(question)
{
  questionContainer.style.display = "none";
  answerFormContainer.style.display = "block"
  div_header.style.display = "none";

  questionDisplay.style.display = "block";
  footer.style.display = "none";
  selectedQuestion = question;

  questionDisplay.innerHTML = "";
  displayQuestion(question);
}

function displayQuestion(question)
{
  const container = document.createElement("div");
  container.classList.add("question")

  const title = document.createElement("h3");
  const description = document.createElement("p");

  title.innerHTML = question.title;
  description.innerHTML = question.description;

  container.appendChild(title);
  container.appendChild(description);

  questionDisplay.appendChild(container); 

  const resolve = document.createElement("button");
  resolve.innerHTML = "Delete";
  questionDisplay.appendChild(resolve);
  const cm = document.createElement("h2");
  cm.innerHTML = "COMMENTS";
  cm.style.fontFamily = "Garamond";
  cm.style.fontWeight = "900";
  questionDisplay.appendChild(cm);

  resolve.addEventListener("click", function()
  {
      let selectedQuestionIndex = allQuestions.indexOf(selectedQuestion);

      allQuestions.splice( selectedQuestionIndex, 1 );

      localStorage.setItem(QUESTIONS, JSON.stringify(allQuestions));

      questionDisplay.removeChild(container);

      location.reload();

  })


  question.answers.forEach(function(answer)
  {
    const answerContainer = document.createElement("div");
  
    const nameOfCommentatorNode = document.createElement("h5");
    nameOfCommentatorNode.style.textDecoration = "underline";
    const answerNode = document.createElement("p");

    nameOfCommentatorNode.innerHTML = answer.name;
    answerNode.innerHTML = answer.comment;

    answerContainer.appendChild(nameOfCommentatorNode);
    answerContainer.appendChild(answerNode);

    questionDisplay.appendChild(answerContainer);
  })

}

newQuestion.addEventListener("click", function()
{
  questionContainer.style.display = "block";
  answerFormContainer.style.display = "none";
  questionDisplay.style.display = "none";
  div_header.style.display = "block";
  footer.style.display = "block";


})

submitAnswer.addEventListener("click", function()
{
  const nameOfCommentator = nameCommentator.value;
  const answer = answerCommentator.value;

  const answerContainer = document.createElement("div");
  
  const nameOfCommentatorNode = document.createElement("h5");
  nameOfCommentatorNode.style.textDecoration = "underline";
  const answerNode = document.createElement("p");
  const hrLine = document.createElement("hr");
  nameOfCommentatorNode.innerHTML = nameOfCommentator;
  answerNode.innerHTML = answer;

  answerContainer.appendChild(nameOfCommentatorNode);
  answerContainer.appendChild(answerNode);
  answerContainer.appendChild(hrLine);

  questionDisplay.appendChild(answerContainer);
  

  let selectedQuestionIndex = allQuestions.indexOf(selectedQuestion);

  let question = allQuestions[selectedQuestionIndex];

  console.log(selectedQuestionIndex)

  question.answers.push({ name: nameOfCommentator, comment: answer });

  localStorage.setItem(QUESTIONS, JSON.stringify(allQuestions));

  nameCommentator.value = "";
  answerCommentator.value = "";
  location.reload();

})

search.addEventListener("keyup", function(event)
{
  const value = event.target.value;

  questionListContainer.innerHTML = ""

  allQuestions.forEach(function(question)
  {
    if(question.title.includes(value))
    {
      addToUI(question);
    }
  })
})