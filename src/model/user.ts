import * as yup from "yup";

export enum RoleType {
  user = 1,
  admin = 2,
}
export enum StatusType {
  active = 1,
  suspended,
  deactivated,
}

const userSchema = yup.object().shape({
  id: yup.number().max(24),
  name: yup.string().required(),
  username: yup
    .string()
    .max(15)
    .matches(/^[a-zA-Z0-9]+$/)
    .required(),
  password: yup
    .string()
    .min(8)
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/)
    .required(),
  gender: yup.string().required(),
  role: yup.number().oneOf([RoleType.user, RoleType.admin]).required(),
  avatar: yup.string().required(),
  bio: yup.string().max(512).optional(),
  status: yup
    .number()
    .oneOf([StatusType.active, StatusType.deactivated, StatusType.suspended])
    .required()
    .default(() => StatusType.active),
  createdAt: yup.date().default(() => new Date()),
  updatedAt: yup.date().default(() => new Date()),
});

export type User = yup.InferType<typeof userSchema>;
