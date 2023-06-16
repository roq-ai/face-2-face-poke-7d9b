import * as yup from 'yup';

export const matchResultValidationSchema = yup.object().shape({
  result: yup.string().required(),
  poker_match_id: yup.string().nullable().required(),
  player_id: yup.string().nullable().required(),
});
