import ResultListItem from './ResultListItem';
import { useSelector } from 'react-redux';

const ResultList = () => {
  const results = useSelector(({quiz}) => quiz.results);

  return (
    <div className="m-result my-10">
      <h3>Scoreboard</h3>
      <ul className="m-result__list">
        <div className="m-result__item">
          <span className="m-result__part m-result__name"><b>Naam</b></span>
          <span className="m-result__part m-result__score"><b>Totale score</b></span>
          <span className="m-result__part m-result__amount-correct"><b>Aantal vragen goed</b></span>
        </div>
        {results.map(({ _id, score, correctAnswers }) => (
          <ResultListItem key={_id} name={_id} score={score} correctAnswers={correctAnswers}/>
        ))}
      </ul>
    </div>
  );
};

export default ResultList;