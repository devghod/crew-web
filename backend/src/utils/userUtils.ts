import UserModel from "../models/user.model";

export const firstLastName = async(user_id: string) => {
  if (!user_id) return;

  const name = await UserModel
      .findById(user_id)
      .select('first_name last_name');

  return `${name.first_name} ${name.last_name}`;
};