export interface IWordCard {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}
export interface IUserWord {
  id: string;
  difficulty: string;
  wordId: string;
  optional: {
    sprint?: string;
    audioCall?: string;
  };
}

export interface IPageResultProps {
  userWordsList: IUserWord[];
  difficulty: string;
  dataWords: IWordCard[] | null;
}

export interface IWordType {
  difficulty: string;
  optional: {
    sprint?: boolean;
    audioCall?: boolean;
  };
}

export interface IUserSignUp {
  name?: string;
  email: string;
  password: string;
}

export interface IUserInfo {
  name: string;
  email: string;
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
}
