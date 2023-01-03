import { DB } from './db';
import { Studyset } from 'src/types/studyset';
import { Flashcard } from 'src/types/studyset';
import { liveQuery } from 'dexie';
import { useObservable } from '@vueuse/rxjs';
import SettingService from './setting';
import moment from 'moment';

enum LEARN_STATUS {
  REMEMBERED,
  NEED_LEARN,
  IGNORE,
}

export default class StudysetService {
  static readonly STATUS = LEARN_STATUS;

  static readonly SPACED_REPETITION_BLOCK = [24, 48, 168, 336, 720];

  static create = async (data: Studyset) => {
    return await DB.studysets.add(data);
  };

  static update = async (id: number, data: Studyset) => {
    if (id) return await DB.studysets.update(id, data);
  };

  static get = async (id: number) => {
    return await DB.studysets.get(id);
  };

  static getLast = async () => {
    return await DB.studysets.orderBy('id').last();
  };

  static getAll = () => {
    return useObservable<Studyset[]>(
      liveQuery(() => DB.studysets.orderBy('id').reverse().toArray()) as any // eslint-disable-line
    );
  };

  static delete = (id?: number) => {
    if (id) return DB.studysets.delete(id);
  };

  static getLearnData = async () => {
    const currentSetting = await SettingService.getCurrentSetting();
    const maxFlashcard = currentSetting?.max_flashcards || 5;
    const learnStudysets = currentSetting?.learn_study_set || [];
    const randomStudysetID =
      learnStudysets[Math.random() * learnStudysets.length];

    const studySet = randomStudysetID
      ? await this.get(randomStudysetID)
      : await this.getLast();

    const flashcards =
      studySet && studySet.flashcards
        ? studySet.flashcards.filter((item) => {
            const currentTime = moment();
            const learnTime = moment(item?.next_learn);
            return (
              (!item.next_learn || learnTime <= currentTime) && item.level > -1
            );
          })
        : [];

    const learnFlashcard = flashcards
      .sort(() => Math.random() - Math.random())
      .slice(0, maxFlashcard);

    return {
      studySet: studySet?.id ?? -1,
      flashcards: learnFlashcard,
    };
  };

  static updateLearnData = async (
    type: number,
    studySetID: number,
    flashcard: Flashcard
  ) => {
    const studySet = await this.get(studySetID);
    const flashcards = studySet?.flashcards;
    const updateFlashcards = flashcards?.map((item) => {
      if (item.id == flashcard.id) {
        let newLevel = 0;
        let nextTime = moment();
        if (type == this.STATUS.REMEMBERED) {
          newLevel = item.level + 1;
          nextTime = nextTime.add(
            this.SPACED_REPETITION_BLOCK[item.level || 0],
            'h'
          );
        } else if (type == this.STATUS.IGNORE) {
          newLevel = -1;
        }
        return {
          ...item,
          level: newLevel,
          next_learn: nextTime,
        };
      }
      return item;
    });

    await DB.studysets.update(studySetID, {
      flashcards: JSON.parse(JSON.stringify(updateFlashcards)),
    });
  };
}
