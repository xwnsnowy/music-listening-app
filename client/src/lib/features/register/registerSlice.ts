import { createAppSlice } from "@/lib/createAppSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";

interface DateOfBirth {
  day: string;
  month: "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December";
  year: string;
}

interface RegisterSliceState {
  currentStep: number;
  email: string;
  password: string;
  name: string;
  dob: DateOfBirth;
  gender: "male" | "female" | "non-binary" | "something-else" | "prefer-not-to-say";
}

const initialState: RegisterSliceState = {
  currentStep: 1,
  email: "",
  password: "",
  name: "",
  dob: { day: "", month: "January", year: "" },
  gender: "male",
};

export const registerSlice = createAppSlice({
  name: "register",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setPersonalInfo: (state, action: PayloadAction<{ name: string, dob: DateOfBirth, gender: "male" | "female" | "non-binary" | "something-else" | "prefer-not-to-say" }>) => {
      state.name = action.payload.name;
      state.dob = action.payload.dob;
      state.gender = action.payload.gender;
    }
  },
});

export const { setCurrentStep, setEmail, setPassword, setPersonalInfo } = registerSlice.actions;

export const selectCurrentStep = (state: RootState) => state.register.currentStep;
export const selectEmail = (state: RootState) => state.register.email;
export const selectPassword = (state: RootState) => state.register.password;
export const selectName = (state: RootState) => state.register.name;
export const selectDOB = (state: RootState) => state.register.dob;
export const selectGender = (state: RootState) => state.register.gender;

export default registerSlice.reducer;
