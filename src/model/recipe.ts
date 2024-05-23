import * as yup from "yup";
export type IdType = string;

export const recipeSchema = yup.object().shape({
  id: yup.string().required().max(24),
  userId: yup.string().required().max(24),
  name: yup.string().required().max(80),
  description: yup.string().required().max(256),
  time: yup.number().required(),
  products: yup.array().of(yup.string().required()).required(),
  photo: yup
    .string()
    .required()
    .matches(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/),
  details: yup.string().required().max(2048),
  tags: yup.array().of(yup.string().required()).required(),
  createdAt: yup.date().default(() => new Date()),
  updatedAt: yup.date().default(() => new Date()),
});

export type Recipe = yup.InferType<typeof recipeSchema>;

export class RecipeCreateDTO implements Omit<Recipe, "id"> {
  constructor(
    public userId: string,
    public name: string,
    public description: string,
    public time: number,
    public products: string[],
    public photo: string,
    public details: string,
    public tags: string[],
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
