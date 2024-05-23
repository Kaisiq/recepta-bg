import { useLoaderData } from "react-router-dom";
import { Recipe } from "../model/recipe";
import RecipeFilter from "../components/RecipeFilter";
import { useEffect, useState } from "react";

const HomePage = () => {
  const recipes = useLoaderData() as Recipe[];

  const [authorFilter, setAuthorFilter] = useState<string[]>([]);
  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const [filteredByAuthor, setFilteredByAuthor] = useState<Recipe[]>(recipes);
  const [filteredByTag, setFilteredByTag] = useState<Recipe[]>(recipes);

  const handleAuthorFilter = (filter: string) => {
    if (!filter) {
      setAuthorFilter([]);
    }
    setAuthorFilter(filter.split(",").map(el => el.trim()));
  };
  const handleTagFilter = (filter: string) => {
    if (!filter) {
      setTagFilter([]);
    }
    setTagFilter(filter.split(",").map(el => el.trim()));
  };

  useEffect(() => {
    if (authorFilter.length > 0) {
      setFilteredByAuthor(
        recipes.filter((recipe) =>
          authorFilter.every((author) => recipe.userId.includes(author))
        )
      );
    } else {
      setFilteredByAuthor(recipes);
    }
  }, [authorFilter, recipes]);

  useEffect(() => {
    if (tagFilter.length > 0) {
      setFilteredByTag(
        filteredByAuthor.filter((recipe) =>
          tagFilter.every((tag) => recipe.tags.includes(tag))
        )
      );
    } else {
      setFilteredByTag(filteredByAuthor);
    }
  }, [tagFilter, filteredByAuthor]);

  return (
    <div className="flex flex-col gap-5">
      <h1>Home Page</h1>
      <RecipeFilter
        handleTagFilter={handleTagFilter}
        handleAuthorFilter={handleAuthorFilter}
      />
      {filteredByTag
      .sort((a, b) => Number(new Date(b.updatedAt)) - Number(new Date(a.updatedAt)))
      .map((recipe) => {
        const date = new Date(recipe.updatedAt);
        return (
          <div key={recipe.id}>
            <h2>{recipe.name}</h2>
            <img src={recipe.photo} alt={recipe.name} />
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
