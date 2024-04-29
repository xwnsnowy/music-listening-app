export interface RegisterStepFirst {
  email: string;
}
export interface RegisterStepSecond {
  password: string;
}

export interface RegisterStepThird {
  name: string;
  dob: {
    day: string;
    month:
      | "January"
      | "February"
      | "March"
      | "April"
      | "May"
      | "June"
      | "July"
      | "August"
      | "September"
      | "October"
      | "November"
      | "December";
    year: string;
  };
  gender:
    | "male"
    | "female"
    | "non-binary"
    | "something-else"
    | "prefer-not-to-say";
}

export interface RegisterStepFourth {
  receiveMarketingMessages?: boolean;
  shareDataWithContentProviders?: boolean;
}

export interface Artist {
  name: string;
  picture?: FileList;
  description?: string;
  followers?: number;
  facebook?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
}

export interface Song {
  name: string;
  picture?: FileList;
  song?: FileList;
}

export interface Artists {
  _id: string;
  name: string;
  picture?: string | null;
  description?: string | null;
  followers?: number | null;
  facebook?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
}

export interface Songs {
  name: string;
  picture?: FileList;
  song?: FileList;
}
