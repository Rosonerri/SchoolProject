import axios from "axios";

const URL: string = "http://localhost:3344/api";

export const registerSchool = async (data: any) => {
  try {
    return await axios
      .post(`${URL}/create-school`, { email: data })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const loginSchool = async (data: {}) => {
  try {
    return await axios
      .post(`${URL}/login-school`, data, { withCredentials: true })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getSchoolCookie = async () => {
  try {
    return await axios
      .get(`${URL}/read-school-cookie`, { withCredentials: true })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const verifySchool = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/verify-school/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const changeSchoolRef = async (schoolID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/change-school-ref/${schoolID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const changeSchoolName = async (schoolID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/change-school-name/${schoolID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const changeSchoolStarted = async (schoolID: string) => {
  try {
    return await axios
      .patch(`${URL}/change-school-started/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const readSchool = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const logout = async () => {
  try {
    return await axios.delete(`${URL}/logout`).then((res: any) => {
      return res?.data;
    });
  } catch (error) {
    return error;
  }
};
