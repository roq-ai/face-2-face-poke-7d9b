import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createRsvp } from 'apiSdk/rsvps';
import { Error } from 'components/error';
import { rsvpValidationSchema } from 'validationSchema/rsvps';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { PokerMatchInterface } from 'interfaces/poker-match';
import { getUsers } from 'apiSdk/users';
import { getPokerMatches } from 'apiSdk/poker-matches';
import { RsvpInterface } from 'interfaces/rsvp';

function RsvpCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: RsvpInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createRsvp(values);
      resetForm();
      router.push('/rsvps');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<RsvpInterface>({
    initialValues: {
      status: '',
      user_id: (router.query.user_id as string) ?? null,
      poker_match_id: (router.query.poker_match_id as string) ?? null,
    },
    validationSchema: rsvpValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Rsvp
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
            <FormLabel>Status</FormLabel>
            <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
            {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<PokerMatchInterface>
            formik={formik}
            name={'poker_match_id'}
            label={'Select Poker Match'}
            placeholder={'Select Poker Match'}
            fetcher={getPokerMatches}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.date_time}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'rsvp',
  operation: AccessOperationEnum.CREATE,
})(RsvpCreatePage);
