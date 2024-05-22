import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Recipe, addRecipe, editRecipe } from '../services/recipe-service';
import { redirect, useLocation } from 'react-router-dom';
import * as yup from 'yup';

const AddRecipePage = () => {
  const user = window.sessionStorage.getItem('user');
  if (!user) throw new Error('impossible');

  const userId = JSON.parse(user).id;

  const location = useLocation();
  const recipe = location.state as Recipe | undefined;

  const parsedRecipe = {
    ...recipe,
    products: recipe?.products.join(', '),
    tags: recipe?.tags.join(', '),
    userId: recipe?.userId || userId,
  };

  const validateSchema = yup.object().shape({
    id: yup.string(),
    userId: yup.string().required(),
    name: yup.string().required(),
    description: yup.string().required(),
    time: yup.number().required().positive().integer(),
    products: yup.string().required(),
    photo: yup.string().required(),
    details: yup.string().required(),
    tags: yup.string().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
  });

  type ValidatedRecipe = yup.InferType<typeof validateSchema>;


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidatedRecipe>({
    resolver: yupResolver(validateSchema),
    defaultValues: parsedRecipe,
  });

  const onSubmit = (data: ValidatedRecipe) => {
    const parsedData: Recipe = {
      ...data,
      products: data.products.split(',').map(el => el.trim()),
      tags: data.tags.split(',').map(el => el.trim()),
    };
    const saveRecipe = recipe ? editRecipe : addRecipe;
    saveRecipe(parsedData)
      .then(() => {
        return redirect('/');
      })
      .catch(err => console.log(err));
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
