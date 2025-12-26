import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  internships: [],
  internship: {},
};

const internshipSlice = createSlice({
  name: "internship",
  initialState,
  reducers: {
    setInternships: (state, action) => {
      state.internships = action.payload;
    },
    setInternshipBySlug: (state, action) => {
      state.internship = action.payload;
    },
    deleteInternshipById: (state, action) => {
      state.internships = state.internships.filter(
        (internship) => internship._id !== action.payload
      );
    },
  },
});
const { reducer, actions } = internshipSlice;
export const { setInternships, setInternshipBySlug, deleteInternshipById } =
  actions;
export default reducer;
