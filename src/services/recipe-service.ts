import { Recipe } from "../model/recipe";

const server = "http://localhost:3000";

// Get all recipes
export async function getAllRecipes() {
  const response = await fetch(`${server}/recipes`);
  return await response.json();
}

// Get 10 latest recipes
export async function getLatestRecipes() {
  const response = await fetch(`${server}/recipes?_limit=10`);
  return await response.json();
}

// Add recipe
export async function addRecipe(recipe: Recipe): Promise<Recipe> {
  const response = await fetch(`${server}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
  return await response.json();
}

// Remove recipe
export async function removeRecipe(id: string | undefined) {
  if (!id) {
    return null;
  }
  const response = await fetch(`${server}/recipes/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}

// Edit recipe
export async function editRecipe(recipe: Recipe) {
  recipe.updatedAt = new Date();
  const response = await fetch(`${server}/recipes/${recipe.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
  return await response.json();
}
