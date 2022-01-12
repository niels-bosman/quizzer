import WinnerGraphBar from './WinnerGraphBar';
import { useSelector } from 'react-redux';

const WinnerGraph = () => {
  const results = useSelector(({ quiz }) => quiz.results);

  const calculatePercentage = (maxScore, ownScore) => Math.round((ownScore / maxScore) * 100 / 1.5);

  let orderedWinners = [];
  let first;
  let second;
  let third;

  results.length >= 3
    ? [first, second, third] = [...results]
    :  [first, second] = [...results];

  orderedWinners.push({ ...second, percentage: calculatePercentage(first.score, second.score) });
  orderedWinners.push({ ...first, percentage: 100 });

  if (third) {
    orderedWinners.push({ ...second, percentage: calculatePercentage(first.score, third.score) });
  }

  return (
    <div className="m-winner-graph">
      {orderedWinners.map((winner, index) => (
        <WinnerGraphBar
          name={winner._id}
          score={winner.score}
          place={index + 1 === 1 ? 2 : index + 1 === 2 ? 1 : 3}
          percentage={winner.percentage}
          key={winner._id}
        />
      ))}
    </div>
  );
};

export default WinnerGraph;