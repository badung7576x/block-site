import Dexie, { Table } from 'dexie';
import { Blocksite } from 'src/types/blocksite';
import { Studyset } from 'src/types/studyset';
import { Setting } from 'src/types/setting';

export class CustomDexie extends Dexie {
  blocksites!: Table<Blocksite>;
  studysets!: Table<Studyset>;
  setting!: Table<Setting>;

  constructor() {
    super('blocklearn');

    this.version(1).stores({
      blocksites:
        '++id, icon, url, title, time.start, time.end, days, accessable',
      studysets: '++id, name, description, flashcards',
      setting: '++id, learn_study_set, max_flashcards',
    });
  }
}

export const DB = new CustomDexie();
