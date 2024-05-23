import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RecipeCreateDTO } from "../model/recipe";
import { addRecipe } from "../services/recipe-service";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const validateSchema = yup.object().shape({
  // userId: yup.string().required().max(24),
  name: yup.string().required().max(80),
  description: yup.string().required().max(256),
  time: yup.number().required().positive().integer(),
  products: yup.string().required(),
  photo: yup
    .string()
    .required()
    .matches(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/),
  details: yup.string().required().max(2048),
  tags: yup.string().required(),
});

type ValidatedRecipe = yup.InferType<typeof validateSchema>;

const AddRecipePage = () => {
  const user = window.sessionStorage.getItem("user");
  if (!user) throw new Error("impossible");
  const navigate = useNavigate();

  const userId = JSON.parse(user).id;
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<ValidatedRecipe>({
    resolver: yupResolver(validateSchema),
    mode: "onChange",
  });

  const onSubmit = (data: ValidatedRecipe) => {
    const toAdd = {
      ...data,
      products: data.products.split(",").map((el) => el.trim()),
      tags: data.tags.split(",").map((el) => el.trim()),
      userId,
      updatedAt: new Date(),
      createdAt: new Date(),
    } as RecipeCreateDTO;
    addRecipe(toAdd)
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.error("Error saving recipe:", err));
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
        <button
          type="submit"
          disabled={!(isDirty && isValid)}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddRecipePage;
