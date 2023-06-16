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
import { createMatchResult } from 'apiSdk/match-results';
import { Error } from 'components/error';
import { matchResultValidationSchema } from 'validationSchema/match-results';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PokerMatchInterface } from 'interfaces/poker-match';
import { UserInterface } from 'interfaces/user';
import { getPokerMatches } from 'apiSdk/poker-matches';
import { getUsers } from 'apiSdk/users';
import { MatchResultInterface } from 'interfaces/match-result';

function MatchResultCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: MatchResultInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createMatchResult(values);
      resetForm();
      router.push('/match-results');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<MatchResultInterface>({
    initialValues: {
      result: '',
      poker_match_id: (router.query.poker_match_id as string) ?? null,
      player_id: (router.query.player_id as string) ?? null,
    },
    validationSchema: matchResultValidationSchema,
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
            Create Match Result
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="result" mb="4" isInvalid={!!formik.errors?.result}>
            <FormLabel>Result</FormLabel>
            <Input type="text" name="result" value={formik.values?.result} onChange={formik.handleChange} />
            {formik.errors.result && <FormErrorMessage>{formik.errors?.result}</FormErrorMessage>}
          </FormControl>
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
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'player_id'}
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
  entity: 'match_result',
  operation: AccessOperationEnum.CREATE,
})(MatchResultCreatePage);
