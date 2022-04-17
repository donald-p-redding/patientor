import { Formik, Form, Field } from "formik";
import { Button } from "@material-ui/core";
import { TextField, SelectField, TypeSpecificFields } from './FormField';

export interface EntryFormValues {
  date: string;
  type: string;
  specialist: string;
  description: string;
  discharge: {date: string, criteria: string}
}

const entryTypes = [
  { value: "HealthCheck", label: "Health Check"},
  { value: "OccupationalHealthcare", label: "Occupational Healthcare"},
  { value: "Hospital", label: "Hospital Visit"},
];


interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  return (
    <Formik
      initialValues={{
        date: '',
        type: '',
        specialist: '',
        description: '',
        discharge: { date:'', criteria: ''},
        employerName: '',
        sickLeave: { startDate: '', endDate: ''},
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'This field is required';
        const formattingError= 'Incorrect format';
        const errors: { [field:string]: string} = {};
        if(!values.description) {
          errors.description = requiredError;
        }

        if(!values.specialist) {
          errors.specialist = requiredError;
        }

        if(!values.date) {
          errors.date = requiredError;
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date)) {
          errors.date = formattingError;
        }

        return errors;
      }}
    >
      {({ values }) => {
        return (
          <Form className='form-ui'>
            <SelectField name='type' label='Entry Type' options={entryTypes}/>
            <Field
              label='Entry Date'
              placeholder="yyyy-mm-dd"
              name='date'
              component={TextField}
            ></Field>
            <Field
              label='Specialist'
              placeholder="Specialist"
              name='specialist'
              component={TextField}
            ></Field>
            <Field
              label='Description'
              placeholder="Description"
              name='description'
              component={TextField}
            ></Field>
            { values.type ?
              <TypeSpecificFields type={values.type}/>
              : ''
            }
            <Button 
              type='submit'
              variant='contained'
              color="secondary"
              >
              Submit
            </Button>
            <Button
              onClick={onCancel}
              type='button'
              variant='contained'
            >
              Cancel
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;