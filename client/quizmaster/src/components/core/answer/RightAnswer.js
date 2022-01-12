const RightAnswer = ({ question, answer, ...props }) => (
  <div {...props}>
    <h3>{question}</h3>
    <p>Juiste antwoord: {answer}</p>
  </div>
);

export default RightAnswer;