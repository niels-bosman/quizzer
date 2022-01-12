import InfoLabel from '../InfoLabel';
import Title from '../Title';

const Waiting = () => {
  return (
    <>
      <InfoLabel>Even geduld</InfoLabel>
      <div className="text-center">
        <Title>Aan het wachten</Title>
        <h2>De Quiz master is nu de vraag aan het selecteren...</h2>
      </div>
    </>
  );
};

export default Waiting;