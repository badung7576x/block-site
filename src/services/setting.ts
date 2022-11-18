import { DB } from './db';
import { Setting } from 'src/types/setting';

export default class SettingService {
  static getCurrentSetting = async () => {
    return await DB.setting.orderBy('id').last();
  };

  static save = async (data: Setting) => {
    DB.setting.clear();
    await DB.setting.add(data);
  };
}
