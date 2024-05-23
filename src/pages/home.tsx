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
      console.log(tagFilter, recipes[0].tags);
      filteredRecipes = filteredRecipes.filter((recipe) =>
        tagFilter.every((tag) => recipe.tags.some((recipeTag) => recipeTag.includes(tag)))
      );
    }

    setFiltered(filteredRecipes);
  }, [authorFilter, tagFilter, recipes]);

  return (
    <div className="flex flex-col gap-5">
      <h1>Home Page</h1>
      <RecipeFilter
        handleTagFilter={handleTagFilter}
        handleAuthorFilter={handleAuthorFilter}
      />
      {filtered
        .sort((a, b) => Number(new Date(b.updatedAt)) - Number(new Date(a.updatedAt)))
        .map((recipe) => {
          const date = new Date(recipe.updatedAt);
          return (
            <div key={recipe.id}>
              <h2>{recipe.name}</h2>
              <img
                src={recipe.photo}
                alt={recipe.name}
              />
              <p>{recipe.description.substring(0, 150)}...</p>
              <p>Products: {recipe.products.join(", ")}</p>
              <p>Last Modified: {date.toLocaleDateString()}</p>
            </div>
          );
        })}
    </div>
  );
};

export default HomePage;
