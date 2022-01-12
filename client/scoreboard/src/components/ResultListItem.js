const ResultListItem = ({ name, score, correctAnswers }) => (
  <div className="m-result__item">
    <span className="m-result__part m-result__name">{name}</span>
    <span className="m-result__part m-result__score">{score}</span>
    <span className="m-result__part m-result__amount-correct">{correctAnswers}</span>
  </div>
);

export default ResultListItem;