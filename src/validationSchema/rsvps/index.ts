import * as yup from 'yup';

export const rsvpValidationSchema = yup.object().shape({
  status: yup.string().required(),
  user_id: yup.string().nullable().required(),
  poker_match_id: yup.string().nullable().required(),
});
