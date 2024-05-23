import { useLoaderData } from "react-router-dom";
import { Recipe } from "../model/recipe";

const HomePage = () => {
  const recipes = useLoaderData() as Recipe[];
  return (
    <div className="flex flex-col gap-5">
      <h1>Home Page</h1>
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="flex items-center justify-center w-full h-full"
        >
          <h2 className="text-xl font-bold">{recipe.name}</h2>
          <img
            src={recipe.photo}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          <p className="text-sm text-gray-500">{recipe.description}</p>
          <span className="text-sm text-gray-500">Time: {recipe.time} minutes</span>
          <span className="text-sm text-gray-500">Products: {recipe.products.join(", ")}</span>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
