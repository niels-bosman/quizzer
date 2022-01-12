import { useDispatch, useSelector } from 'react-redux';
import flagEn from '../../../images/en-flag.png';
import flagNl from '../../../images/nl-flag.png';
import { unselectAll } from '../../../reducers/category';
import { setLanguage } from '../../../reducers/quiz';

const SelectLanguage = () => {
  const currentLanguage = useSelector(({ quiz }) => quiz.language);
  const dispatch        = useDispatch();

  const options = [
    { language: 'nl', image: flagNl },
    { language: 'en', image: flagEn },
  ];

  const classes = {
    active: 'm-language-selection__item--active',
  };

  const handleClick = language => {
    dispatch(unselectAll());
    dispatch(setLanguage(language));
  };

  return (
    <div className="m-language-selection mb-7">
      {
        options.map(({ language, image }) => (
          <div
            key={language}
            className={`m-language-selection__item ${language === currentLanguage ? classes.active : ''}`}
            onClick={() => handleClick(language)}
          >
            <img src={image} alt={`${language} flag`} className="m-language-selection__image" />
          </div>
        ))
      }
    </div>
  );
};

export default SelectLanguage;