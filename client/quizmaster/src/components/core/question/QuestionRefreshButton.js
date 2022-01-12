import { useDispatch } from 'react-redux';
import { fetchQuestions } from '../../../reducers/question';

const QuestionRefreshButton = () => {
  const dispatch = useDispatch();

  const refreshQuestions = () => dispatch(fetchQuestions());

  return (
    <button
      className="a-button a-button--primary a-refresh-button"
      onClick={refreshQuestions}
      title="Nieuwe vragen"
    >
      <i className="a-refresh-button__icon fas fa-sync-alt" />
    </button>
  );
};

export default QuestionRefreshButton;