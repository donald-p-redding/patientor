import { ErrorMessage, FieldProps, Field } from "formik";
import {
  TextField as TextFieldMUI,
  Typography,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import { Entry } from '../types';


interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField = ({ label, placeholder, field }:TextProps) => (
    <div style={{ marginBottom: "1em" }}>
    <TextFieldMUI
      fullWidth
      label={label}
      placeholder={placeholder}
      {...field}
    />
    <Typography variant="subtitle2" style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </Typography>
  </div>
);

export type EntryOption = {
  value: string | number;
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: EntryOption[];
};

const FormikSelect = ({ field, ...props }: FieldProps) => <Select {...field} {...props} />;

export const SelectField = ({ name, label, options }: SelectFieldProps) => (
  <>
    <InputLabel>{label}</InputLabel>
    <Field
      fullWidth
      style={{ marginBottom: "0.5em" }}
      label={label}
      component={FormikSelect}
      name={name}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
  </>
);

const HospitalFields = () => {
  return (
    <>
      <Field
        fullWidth
        style={{ marginBottom: "0.5em" }}
        label='Discharge Date'
        name='discharge.date'
        placeholder='yyyy-mm-dd'
        component={TextField}
      ></Field>
      <Field
        fullWidth
        style={{ marginBottom: "0.5em" }}
        label='Discharge Criteria'
        name='discharge.criteria'
        component={TextField}
      ></Field>
    </>
  );
};

const OccupationalFields = () => {
  return (
    <>
      <Field
        style={{ marginBottom: "0.5em" }}
        label='Employer Name'
        name='employerName'
        component={TextField}
      ></Field>
      <Field
        style={{ marginBottom: "0.5em" }}
        label='Sick Leave Start Date'
        name='sickLeave.startDate'
        component={TextField}
        placeholder='yyyy-mm-dd'
      ></Field>
      <Field
        style={{ marginBottom: "0.5em" }}
        label='Sick Leave End Date'
        name='sickLeave.endDate'
        placeholder='yyyy-mm-dd'
        component={TextField}
      ></Field>
    </>
  );
};

const HealthCheckFields = () => {
  const healthCheckTypes = [
    { value: 0, label: "Healthy"},
    { value: 1, label: "Low Risk"},
    { value: 2, label: "High Risk"},
    { value: 3, label: "Critical Risk"},
  ];

  return (
    <SelectField name='healthCheck' label='Health Check Rating' options={healthCheckTypes}/>
  );
};


export const TypeSpecificFields = ({ type }:{type:string}) => {
  let field:() => JSX.Element;

  switch(type as Entry['type']) {
    case "Hospital":
      field = HospitalFields;
      break;
    case "OccupationalHealthcare":
      field = OccupationalFields;
      break;
    case "HealthCheck":
      field = HealthCheckFields;
      break;
  }

  return (
    <>
      <Field
      style={{ marginBottom: "0.5em" }}
      component={field}
      >
      </Field>
    </>
  );
};