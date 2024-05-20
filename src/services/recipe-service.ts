export type Recipe = {
  id: string;
  userId: string;
  name: string;
  description: string;
  time: number;
  products: string[];
  photo: string;
  details: string;
  tags: string[];
  date: Date;
  lastModified: Date;
};

const server = "http://localhost:3000";

// Get all recipes
  export async function getAllRecipes() {
    const response = await fetch(`${server}/recipes`);
    return await response.json() as Recipe[];
  }
  
  // Get 10 latest recipes
  export async function getLatestRecipes() {
    const response = await fetch(`${server}/recipes?_limit=10`);
    return await response.json();
  }
  
  // Add recipe
  export async function addRecipe(recipe: Recipe) {
    const response = await fetch('http://localhost:9000/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipe)
    });
    return await response.json();
  }
  
  // Remove recipe
  export async function removeRecipe(id: number) {
    const response = await fetch(`http://localhost:9000/recipes/${id}`, {
      method: 'DELETE'
    });
    return await response.json();
  }
  
  // Edit recipe
  export async function editRecipe(recipe: Recipe) {
    const response = await fetch(`http://localhost:9000/recipes/${recipe.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipe)
    });
    return await response.json();
  }
