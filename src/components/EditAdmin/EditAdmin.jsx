import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const EditAdmin = ({fetchUrl, url}) => {
    const {id} = useParams()
    const [isAdmin, setIsAdmin] = useState('')
    const token = Cookies.get('authToken');
    useEffect(() => {
        if (!fetchUrl) return;
          console.log(fetchUrl);
        fetch("https://ecoton-backend.ivgpu.ru/" + fetchUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setIsAdmin(data["user_info"]); // Устанавливаем данные, используя ключ dataKey
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }, []);
      console.log(isAdmin.role)
      if (isAdmin.role != "admin"){
        return <></>
      }
    return (
        <a href={`${url}/${id}/change/`}>
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16"
            height="16" 
            fill="currentColor" 
            class="bi bi-pencil-square" 
            viewBox="0 0 16 16">
                <path 
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                />
                <path 
                    fill-rule="evenodd" 
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
            </svg>
        </a>
    )
}

export default EditAdmin;