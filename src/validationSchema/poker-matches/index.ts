import * as yup from 'yup';

export const pokerMatchValidationSchema = yup.object().shape({
  date_time: yup.date().required(),
  club_id: yup.string().nullable().required(),
  host_id: yup.string().nullable().required(),
});
