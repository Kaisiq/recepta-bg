import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Recipe, addRecipe, editRecipe } from "../services/recipe-service";
import { recipeSchema } from "../services/recipe-service";
import { redirect, useLocation } from "react-router-dom";

const AddRecipePage = () => {
  const user = window.sessionStorage.getItem("user");
  if (!user) throw new Error("impossible");

  const location = useLocation();
  const recipe = location.state as Recipe | undefined;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(recipeSchema),
    defaultValues: recipe,
  });

  console.log(recipe);

  const onSubmit = (data: Recipe) => {
    data = { ...data, userId: JSON.parse(user).id };
    if (recipe) {
      editRecipe(data)
        .then(() => {
          return redirect("/");
        })
        .catch((err) => console.log(err));
    } else {
      addRecipe(data)
        .then(() => {
          return redirect("/");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="m-5 w-full">
      <h1>Add Recipe</h1>
      <form
        className="mx-auto min-w-[65vw] flex flex-col gap-2 mt-2 p-4 border-2 border-black rounded-md"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="p-2 rounded-md"
          type="text"
          {...register("name")}
          placeholder="Name"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <input
          type="text"
          className="p-2 rounded-md"
          {...register("description")}
          placeholder="Description"
        />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        <input
          className="p-2 rounded-md"
          type="number"
          {...register("time")}
          placeholder="Time"
        />
        {errors.time && <p className="text-red-500">{errors.time.message}</p>}
        <textarea
          className="p-2 rounded-md"
          {...register("products")}
          placeholder="Products"
        />
        {errors.products && <p className="text-red-500">{errors.products.message}</p>}
        <input
          className="p-2 rounded-md"
          type="text"
          {...register("photo")}
          placeholder="Photo"
        />
        {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}
        <textarea
          className="p-2 rounded-md"
          {...register("details")}
          placeholder="Details"
        />
        {errors.details && <p className="text-red-500">{errors.details.message}</p>}
        <input
          className="p-2 rounded-md"
          type="text"
          {...register("tags")}
          placeholder="Tags"
        />
        {errors.tags && <p className="text-red-500">{errors.tags.message}</p>}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddRecipePage;
