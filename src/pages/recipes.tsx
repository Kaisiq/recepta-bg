import { Recipe } from "../services/recipe-service";
import { useLoaderData } from "react-router-dom";

const RecipesPage = () => {
  const recipes = useLoaderData() as Recipe[];

  return (
    <div>
      {recipes.map((recipe) => (
        <>
          <div key={recipe.id}>
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
            <p>Time: {recipe.time} minutes</p>
            <p>Products: {recipe.products.join(', ')}</p>
            <img src={recipe.photo} alt={recipe.name} />
            <p>{recipe.details}</p>
            <p>Tags: {recipe.tags.join(', ')}</p>
            <p>Last Modified: {recipe.updatedAt.toLocaleDateString()}</p>
          </div>
        </>
      ))}
    </div>
  );
};

export default RecipesPage;
