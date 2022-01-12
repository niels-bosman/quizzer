import Title from '../Title';
import WinnerGraph from '../WinnerGraph';
import ResultList from '../ResultList';

const Result = () => (
  <div className="my-6">
    <Title>De Quiz is klaar! 🎉</Title>
    <WinnerGraph />
    <ResultList />
  </div>
);

export default Result;