import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchCategories } from '../../reducers/category';
import CategoryGrid from '../core/category/CategoryGrid';
import SelectLanguage from '../core/category/SelectLanguage';
import ButtonPrimary from '../core/ButtonPrimary';
import axios from 'axios';
import { BASE_URL } from '../../api';

const SelectCategories = () => {
  const dispatch     = useDispatch();
  const lobbyId      = useSelector(({ quiz }) => quiz.lobbyId);
  const categories   = useSelector(({ category }) => category.selected);
  const language     = useSelector(({ quiz }) => quiz.language);
  const history      = useHistory();
  const selectAmount = categories.length;
  const valid        = selectAmount === 3;

  useEffect(() => {
    dispatch(fetchCategories(language));
  }, [language, dispatch]);

  const startRound = async () => {
    await axios.post(`${BASE_URL}/lobbies/${lobbyId}/categories`, { categories });
    history.push('/question');
  };

  return (
    <>
      <SelectLanguage />
      <h2>Selecteer drie categorieën voor deze ronde</h2>
      <CategoryGrid />
      <p>{selectAmount} van de 3 categorieën geselecteerd. {valid && <span>&#10004;</span>}</p>
      <ButtonPrimary classes="mt-4" disabled={!valid} onClick={startRound}>
        De ronde beginnen
      </ButtonPrimary>
    </>
  );
};

export default SelectCategories;