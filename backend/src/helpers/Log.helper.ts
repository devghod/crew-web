import LogModel from '../models/log.model';
import { getUserInfoFromToken } from '../utils/userUtils';

export const Logging = async(
  result: any,
  request: any,
  action: string,
  model: string,
) => {
  const userInfo = await getUserInfoFromToken(request);

  new LogModel({
    id_in_table: result._id,
    action: action.toUpperCase(),
    details: `${userInfo.id} ${action.toLocaleLowerCase()} ${result._id.toString()}`,
    user_id_execute: userInfo.id,
    new_data: result,
    model: model,
    old_data: {},
  }).save();
}