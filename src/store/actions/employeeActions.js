import { FETCH_EMPLOYEES_SUCCESS, FETCH_EMPLOYEES_FAILED } from "./actionType";

const baseUrl = "http://localhost:3000";

export const employeesActionFetchSuccess = (payload) => {
  return {
    type: FETCH_EMPLOYEES_SUCCESS,
    payload,
  };
};

export const employeesActionFetchFailed = (error) => {
  return {
    type: FETCH_EMPLOYEES_FAILED,
    error,
  };
};

export const fetchEmployees = () => async (dispatch, getState) => {
  try {
    const response = await fetch(`${baseUrl}/employees`);
    if (!response.ok) {
      throw new Error("Error: " + response.status);
    }

    const jsonData = await response.json();

    dispatch(employeesActionFetchSuccess(jsonData));
  } catch (error) {
    console.error(error);
    dispatch(employeesActionFetchFailed(error));
  }
};
