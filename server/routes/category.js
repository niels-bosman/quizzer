import express from 'express';
import { getCategories } from '../controllers/category-controller.js';
import { getQuestionsForCategory } from '../controllers/question-controller.js';

const categoryRouter = express.Router();

categoryRouter.get('/', async ({ query: { language } }, result) => {
  try {
    const categories = await getCategories(language);
    return result.status(200).json(categories);
  } catch (error) {
    return result.status(500).send(error);
  }
});

categoryRouter.get('/:category/questions', async ({ params: { category } }, result) => {
  try {
    const questions = await getQuestionsForCategory(category);
    return result.status(200).json(questions);
  } catch (error) {
    return result.status(500).send(error);
  }
});

export { categoryRouter };