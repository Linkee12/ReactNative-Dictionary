import { useSQLiteContext } from "expo-sqlite";

export type CollectionType = {
  id: number;
  name: string;
};

export  class DbService {
    private db

  constructor(db: ReturnType<typeof useSQLiteContext>) {
    this.db = db;
  }

  // -------- Collections --------

  async addCollection(name: string) {
    await this.db.runAsync(
      `INSERT INTO collections (name) VALUES (?)`,
      [name]
    );
  }

  async removeCollection(id: number) {
    await this.db.runAsync(
      `DELETE FROM collections WHERE id = ?`,
      [id]
    );
  }

  async getCollections():Promise<CollectionType[]> {
    return await this.db.getAllAsync(
      `SELECT * FROM collections`
    );
  }

  // -------- Questions --------

  async addQuestion(collectionId: number, question: string) {
    await this.db.runAsync(
      `INSERT INTO questions (collection_id, question) VALUES (?, ?)`,
      [collectionId, question]
    );
  }

  async removeQuestion(id: number) {
    await this.db.runAsync(
      `DELETE FROM questions WHERE id = ?`,
      [id]
    );
  }

  async getQuestions(collectionId: number) {
    return await this.db.getAllAsync(
      `SELECT * FROM questions WHERE collection_id = ?`,
      [collectionId]
    );
  }

  // -------- Answers --------

  async addAnswer(
    questionId: number,
    text: string,
    isCorrect: boolean
  ) {
    await this.db.runAsync(
      `INSERT INTO answers (question_id, text, is_correct)
       VALUES (?, ?, ?)`,
      [questionId, text, isCorrect ? 1 : 0]
    );
  }

  async removeAnswer(id: number) {
    await this.db.runAsync(
      `DELETE FROM answers WHERE id = ?`,
      [id]
    );
  }

  async getAnswers(questionId: number) {
    return await this.db.getAllAsync(
      `SELECT * FROM answers WHERE question_id = ?`,
      [questionId]
    );
  }
}
