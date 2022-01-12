import { useDispatch, useSelector } from 'react-redux';
import { select, unselect } from '../../../reducers/category';

const CategoryGridItem = ({ category }) => {
  const dispatch           = useDispatch();
  const selectedCategories = useSelector(state => state.category.selected);
  const maxReached         = selectedCategories.length >= 3;
  const selected           = selectedCategories.includes(category);
  const disabled           = !selected && maxReached;

  const handleClick = () => {
    const action = selected ? unselect : select;
    dispatch(action(category));
  };

  const classes = {
    base:     'm-category-grid__item',
    selected: 'm-category-grid__item--selected',
    disabled: 'm-category-grid__item--disabled',
  };

  return (
    <div
      className={`${classes.base} ${selected ? classes.selected : ''} ${disabled ? classes.disabled : ''}`}
      onClick={handleClick}
    >
      {category}
    </div>
  );
};

export default CategoryGridItem;