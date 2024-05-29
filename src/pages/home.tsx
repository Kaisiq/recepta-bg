import { useLoaderData } from "react-router-dom";
import { Recipe } from "../model/recipe";
import RecipeFilter from "../components/RecipeFilter";
import { useEffect, useState } from "react";

const HomePage = () => {
  const recipes = useLoaderData() as Recipe[];

  const [authorFilter, setAuthorFilter] = useState<string[]>([]);
  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const [filtered, setFiltered] = useState<Recipe[]>(recipes);

  const handleAuthorFilter = (filter: string) => {
    if (!filter) {
      setAuthorFilter([]);
    } else {
      setAuthorFilter(filter.split(",").map((el) => el.trim()));
    }
  };

  const handleTagFilter = (filter: string) => {
    if (!filter) {
      setTagFilter([]);
    } else {
      setTagFilter(filter.split(",").map((el) => el.trim()));
    }
  };

  useEffect(() => {
    let filteredRecipes = recipes;

    if (authorFilter.length > 0) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        authorFilter.every((author) => recipe.tags.some((recipeTag) => recipeTag.includes(author)))
      );
    }

    if (tagFilter.length > 0) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        tagFilter.every((tag) => recipe.tags.some((recipeTag) => recipeTag.includes(tag)))
      );
    }

    setFiltered(filteredRecipes);
  }, [authorFilter, tagFilter, recipes]);

  return (
    <div className="flex flex-col gap-2 w-[90%] m-auto">
      <h1 className="text-center">Home Page</h1>
      <RecipeFilter
        handleTagFilter={handleTagFilter}
        handleAuthorFilter={handleAuthorFilter}
      />
      {filtered
        .sort((a, b) => Number(new Date(b.updatedAt)) - Number(new Date(a.updatedAt)))
        .map((recipe, index) => {
          const date = new Date(recipe.updatedAt);
          const bgColor = index % 2 === 0 ? "bg-[#171717]" : "bg-[#313131]";
          return (
            <div
              key={recipe.id}
              className={`flex gap-5 justify-between ${bgColor} p-2 rounded-lg text-lg`}
            >
              <h2 className="basis-full">{recipe.name}</h2>
              <img
                className="basis-full"
                height="150"
                width="150"
                src={recipe.photo}
                alt={recipe.name}
              />
              <p className="basis-full">
                {recipe.description.substring(0, 150)}
                {recipe.description.length > 150 ? "..." : ""}
              </p>
              <p className="basis-full">
                Products: {recipe.products.join(", ").substring(0, 150)}
                {recipe.products.join(", ").length > 150 ? "..." : ""}
              </p>
              <p className="basis-full">Last Modified: {date.toLocaleDateString()}</p>
            </div>
          );
        })}
    </div>
  );
};

export default HomePage;
