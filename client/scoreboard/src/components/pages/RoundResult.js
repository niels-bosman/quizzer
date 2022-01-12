import Title from '../Title';
import RoundResultTable from '../RoundResultTable';

const RoundResult = () => (
  <>
    <div className="text-center my-6">
      <Title>De ronde is voorbij.</Title>
    </div>
    <div className="flex justify-content-center">
      <RoundResultTable />
    </div>
  </>
);


export default RoundResult;