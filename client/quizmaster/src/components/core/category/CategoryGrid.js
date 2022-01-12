import { useSelector } from 'react-redux';
import CategoryGridItem from './CategoryGridItem';

const CategoryGrid = () => {
  const categories = useSelector(state => state.category.all);

  return (
    <div className="m-category-grid mb-10">
      {categories.map(category => <CategoryGridItem key={category} category={category} />)}
    </div>
  );
};

export default CategoryGrid;