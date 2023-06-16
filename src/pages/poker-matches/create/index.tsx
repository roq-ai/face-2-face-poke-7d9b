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
import { createPokerMatch } from 'apiSdk/poker-matches';
import { Error } from 'components/error';
import { pokerMatchValidationSchema } from 'validationSchema/poker-matches';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ClubInterface } from 'interfaces/club';
import { UserInterface } from 'interfaces/user';
import { getClubs } from 'apiSdk/clubs';
import { getUsers } from 'apiSdk/users';
import { PokerMatchInterface } from 'interfaces/poker-match';

function PokerMatchCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PokerMatchInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPokerMatch(values);
      resetForm();
      router.push('/poker-matches');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PokerMatchInterface>({
    initialValues: {
      date_time: new Date(new Date().toDateString()),
      club_id: (router.query.club_id as string) ?? null,
      host_id: (router.query.host_id as string) ?? null,
    },
    validationSchema: pokerMatchValidationSchema,
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
            Create Poker Match
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="date_time" mb="4">
            <FormLabel>Date Time</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.date_time ? new Date(formik.values?.date_time) : null}
                onChange={(value: Date) => formik.setFieldValue('date_time', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <AsyncSelect<ClubInterface>
            formik={formik}
            name={'club_id'}
            label={'Select Club'}
            placeholder={'Select Club'}
            fetcher={getClubs}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'host_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
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
  entity: 'poker_match',
  operation: AccessOperationEnum.CREATE,
})(PokerMatchCreatePage);
