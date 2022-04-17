import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type:'SINGLE_PATIENT';
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: { id:string, entry:Entry };
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SINGLE_PATIENT":
      return {
        ...state,
        patient: {
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis}),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_ENTRY":
      const { id , entry } = action.payload;
      return {
        ...state,
        patient: {
          [id]: {
            ...state.patient[id],
            entries: [...state.patient[id].entries, entry]
          }
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patients:Patient[]):Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients,
  };
};

export const addPatient = (patient:Patient):Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  };
};

export const focusPatient = (patient:Patient):Action => {
  return {
    type: "SINGLE_PATIENT",
    payload: patient,
  };
};

export const setDiagnosesList = (diagnoses:Diagnosis[]):Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnoses,
  };
};

export const addEntry = (id:string, entry:Entry):Action => {
  return {
    type: "ADD_ENTRY",
    payload: {id, entry},
  };
};
