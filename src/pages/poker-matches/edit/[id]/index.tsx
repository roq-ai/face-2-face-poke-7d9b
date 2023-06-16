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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getPokerMatchById, updatePokerMatchById } from 'apiSdk/poker-matches';
import { Error } from 'components/error';
import { pokerMatchValidationSchema } from 'validationSchema/poker-matches';
import { PokerMatchInterface } from 'interfaces/poker-match';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ClubInterface } from 'interfaces/club';
import { UserInterface } from 'interfaces/user';
import { getClubs } from 'apiSdk/clubs';
import { getUsers } from 'apiSdk/users';

function PokerMatchEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PokerMatchInterface>(
    () => (id ? `/poker-matches/${id}` : null),
    () => getPokerMatchById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PokerMatchInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePokerMatchById(id, values);
      mutate(updated);
      resetForm();
      router.push('/poker-matches');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<PokerMatchInterface>({
    initialValues: data,
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
            Edit Poker Match
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'poker_match',
  operation: AccessOperationEnum.UPDATE,
})(PokerMatchEditPage);
