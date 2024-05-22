import { useLoaderData } from "react-router-dom";
import { Recipe } from "../services/recipe-service";

const HomePage = () => {
  const recipes = useLoaderData() as Recipe[];
  return (
    <>
      <h1>Home Page</h1>
        {recipes.map(recipe => 
        <div className="flex flex-col items-center justify-center w-full h-full">
          <img src={recipe.photo} alt={recipe.name} className="w-full h-full object-cover" />
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h2 className="text-xl font-bold">{recipe.name}</h2>
            <p className="text-sm text-gray-500">{recipe.description}</p>
            <div className="flex flex-row items-center justify-center w-full h-full">
              <span className="text-sm text-gray-500">Time: {recipe.time} minutes</span>
              <span className="text-sm text-gray-500">Products: {recipe.products.join(', ')}</span>
            </div>
          </div>
        </div>
        )}
    </>
  )
}

export default HomePage