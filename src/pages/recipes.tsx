import { Recipe } from "../services/recipe-service";
import { useLoaderData } from "react-router-dom";

const RecipesPage = () => {
  const recipes = useLoaderData() as Recipe[];

  return (
    <div>
      {recipes.map((recipe) => (
        <>
          <div key={recipe.id}>{recipe.name}</div>
        </>
      ))}
    </div>
  );
};

export default RecipesPage;
