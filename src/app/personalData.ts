export interface PersonalData {
  name?: string;
  surname?: string;
  middleName?: string;
  birthDate?: string;
  gender?: {
    id: number;
    value: string;
  };
  country?: {
    id: number;
    value: string;
  };
  address?: string;
  maidenName?: string;
  bankCodeName?: string;
  howKnow?: string;
  friendEmail?: string;
  boyfriendPhone?: string;
  footballTeam?: {
    id: number;
    value: string;
  };
  girlfriendPhone?: string;
  firmOfPan?: {
    id: number;
    value: string;
  };
  cardNumber?: string;
  cardExpiryDate?: string;
  cardCode?: string;
  cardType?: {
    id: number;
    value: string;
  };
}
