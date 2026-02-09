import axios from "axios";
import ExpertWizard from "./ExpertWizard";

const apiUrl = window.Env?.API_URL || "http://localhost:8080";


const REGISTER_URL = `${apiUrl}/api/experts/registration`;

export default function ExpertRegister() {
  
  const onSubmit = (fd) => {
    return axios.post(REGISTER_URL, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  return (
    <ExpertWizard
      mode="create"
      onSubmit={onSubmit}
      successRedirect="/"
    />
  );
}
