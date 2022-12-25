import { DB } from './db';
import { Blocksite } from 'src/types/blocksite';
import { liveQuery } from 'dexie';
import { useObservable } from '@vueuse/rxjs';

export default class BlocksiteService {
  static initFormData = () => {
    return {
      url: '',
      title: '',
      origin_url: '',
      time: {
        start: '00:00',
        end: '24:00',
      },
      days: Array(7).fill(false),
    };
  };

  static create = async (data: Blocksite) => {
    return await DB.blocksites.add(data);
  };

  static update = async (id: number, data: Blocksite) => {
    if (id) return await DB.blocksites.update(id, data);
  };

  static getAll = () => {
    return useObservable<Blocksite[]>(
      liveQuery(() => DB.blocksites.orderBy('id').reverse().toArray()) as any // @typescript-eslint/ban-ts-comment
    );
  };

  static delete = (id?: number) => {
    if (id) return DB.blocksites.delete(id);
  };

  static find = async (key: string, value: string) => {
    return await DB.blocksites.where(key).equals(value).first();
  };
}
