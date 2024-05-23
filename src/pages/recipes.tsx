import { removeRecipe } from "../services/recipe-service";
import { Recipe } from "../model/recipe";
import { useLoaderData, useNavigate } from "react-router-dom";

const RecipesPage = () => {
  const recipes = useLoaderData() as Recipe[];
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-3 gap-10 w-[90%] m-auto mt-10 ">
      {recipes.map((recipe) => {
        const date = new Date(recipe.updatedAt);
        return (
          <div
            key={recipe.id}
            className="bg-[#313131] rounded-lg p-2 flex flex-col gap-2"
          >
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
            <p>Време за приготвяне: {recipe.time} мин</p>
            <p>Продукти: {recipe.products.join(", ")}</p>
            <img
              src={recipe.photo}
              alt={recipe.name}
            />
            <p>{recipe.details}</p>
            <p>Тагове: {recipe.tags.join(", ")}</p>
            <p>Последно Променяно: {date.toLocaleDateString()}</p>
            <button onClick={() => navigate(`/edit`, { state: recipe })}>Промяна</button>
            <button onClick={() => removeRecipe(recipe.id)}>Изтриване</button>
          </div>
        );
      })}
    </div>
  );
};

export default RecipesPage;
