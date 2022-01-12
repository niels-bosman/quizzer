import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../../api';

const AnswerListItem = ({ correct, team, children }) => {
  const lobbyId = useSelector(({ quiz }) => quiz.lobbyId);

  const mark = async wantsCorrect => {
    if (wantsCorrect === correct) return;
    await axios.put(`${BASE_URL}/lobbies/${lobbyId}/answers`, { teamId: team._id, correct: wantsCorrect });
  };

  const classes = {
    correct:   'm-answer-list__bar--correct',
    incorrect: 'm-answer-list__bar--incorrect',
  };

  return (
    <div className="m-answer-list__item">
      <p className="m-answer-list__team">{team._id}</p>
      <div className={`m-answer-list__bar ${correct === true ? classes.correct : correct === false ? classes.incorrect : ''}`}>
        <span>{children}</span>
        <div className="m-answer-list__actions">
          <i
            className="m-answer-list__icon m-answer-list__icon--check fas fa-check"
            onClick={() => mark(true)}
            title="Antwoord goedkeuren"
          />
          <i
            className="m-answer-list__icon m-answer-list__icon--cross fas fa-times"
            onClick={() => mark(false)}
            title="Antwoord foutkeuren"
          />
        </div>
      </div>
    </div>
  );
};

export default AnswerListItem;