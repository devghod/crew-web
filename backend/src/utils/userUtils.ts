import UserModel from "../models/user.model";
const jwt = require('jsonwebtoken');

export const firstLastName = async(user_id: string) => {
  if (!user_id) return;

  const name = await UserModel
      .findById(user_id)
      .select('first_name last_name');

  return `${name.first_name} ${name.last_name}`;
};

export const getUserInfoFromToken = async(
  req: any
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return null;

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await UserModel
      .findById(decodedToken.userId)
      .select('_id first_name last_name')
      .lean();

    if (!user) return null;

    const { _id, ...rest } = user;

    return {
      id: _id.toString(),
      full_name: `${user.first_name} ${user.last_name}`,
      ...rest,
    };
  } catch (error) {
    console.log("userUtils", error);
  }
}