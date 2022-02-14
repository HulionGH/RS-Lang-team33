export type wordInfo = {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id: number;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
};

export type userWords = {
  id: string;
  difficulty: string;
  wordId: string;
  optional: {
    sprint?: string;
    audioCall?: string;
  };
};

export type PageSprintSettingsProps = {
  onStart: (difficulty: string, isStart: boolean) => void;
};

export type PageResultProps = {
  userWordsList: userWords[];
  difficulty: string;
  dataWords: wordInfo[] | null;
};

export type wordType = {
  difficulty: string;
  optional: {
    sprint?: boolean;
    audioCall?: boolean;
  };
};

export type userSignUp = {
  name?: string;
  email: string;
  password: string;
};
