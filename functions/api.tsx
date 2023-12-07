import { useState } from "react";
import { APIServer } from "../constant";

// export const getTodoData = () => {
//     fetch('http://192.168.2.106:8081/api/admin/activationStatus?id=10')
//       .then(response => response.json())
//       .then((json) => {
//         // setTodos(json);
//         console.log(json);
//       })
//       .catch(error => {
//         console.error('Error fetching todo data:', error);
//       });
//   };

//   export const postData  = async  (dataToSend) => {

//     let responseMessage = "Login Failed new >>>>>>>>>";
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     var raw = JSON.stringify(dataToSend);

//     var requestOptions: object = {
//     method: 'POST',
//     headers: myHeaders,
//     body: raw,
//     redirect: 'follow'
//     };

//     fetch("http://192.168.2.106:8081/api/users/login", requestOptions)
//     .then(response => response.text())
//     .then(result =>  {
//         console.log("result >>>>>>>> ", result);
//         responseMessage = result + "new  >>>>>>>>>";
//         console.log("responseMessage - inside then >>>>>>>> ", responseMessage);

//         return responseMessage;

//     })
//     .catch(error => {
//         console.log('error', error);
//         return "Login failed latest >>>";

//     })
//   };


//   fetch('http://192.168.2.106:8081/api/users/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json', // Specify content type
//       // Add other headers if needed
//     },
//     body: dataToSend, // Convert data to JSON string
//   })
//   .then(response => response.json())
//   .then((responseData) => {
//     // Handle the response data as needed
//     console.log('POST Response:', responseData);
//     return responseData;
//   })
//   .catch(error => {
//     console.error('Error posting data:', error);
//     return "Login Failed";
//   });
//   return "Login Failed";


// export const loginPostData = async (dataToSend) => {//need to mention the type 
//     try {
//       // let responseMessage = "Login Failed new ";
//       var myHeaders = new Headers();
//       myHeaders.append("Content-Type", "application/json");
  
//       var raw = JSON.stringify(dataToSend);
  
//       var requestOptions: object = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//       };
//       const response = await fetch("http://192.168.1.5:8081/api/users/login", requestOptions);
  
//       // const response = await fetch(`${APIServer}login`, requestOptions);
//       console.log("dsdsf"+ response.status);
//       const result = await response.text();
  
//       console.log("result >>>>>>>> ", result);
//      const responseMessage:any = result;
//       console.log("responseMessage - inside then >>>>>>>> ", responseMessage);
  
//       return responseMessage;
//     } catch (error) {
//       console.log('error', error);
//       return "Login Failed new ";
//     }
//   };
  
  
// export const registerPostData = async (dataToSend) => {
//     try {
//       // let responseMessage = "Register Failed start ";
//       var myHeaders = new Headers();
//       myHeaders.append("Content-Type", "application/json");
  
//       var raw = JSON.stringify(dataToSend);
  
//       var requestOptions: object = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//       };
//       const response = await fetch("http://192.168.1.5:8081/api/users/register", requestOptions);
//       // const response = await fetch(`${APIServer}register`, requestOptions);
//       console.log("dsdsf"+ response.status);
//       const result = await response.text();
  
//       console.log("result >>>>>>>> ", result);
//       const responseMessage:any = result;
//       console.log("responseMessage - inside then >>>>>>>> ", responseMessage);
  
//       return responseMessage;
//     } catch (error) {
//       console.log('error', error);
//       return "Register Failed "; 
//     }
//   };

// export const registerPostData = async (dataToSend) => {
//   try {
//     let responseMessage ;
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     const raw = JSON.stringify(dataToSend);

//     const requestOptions: object = {
//       method: 'POST',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow'
//     };

//     const response = await fetch("http://192.168.1.5:8081/api/users/register", requestOptions);
//     // const response = await fetch(`${APIServer}register`, requestOptions);
//     console.log("Response status: " + response.status);

//     // Check content type of the response
//     const contentType = response.headers.get('content-type');
//     if (contentType && contentType.includes('application/json')) {
//       const result = await response.json(); // Parse JSON response
//       console.log("JSON response >>>>>>>> ", result);
//       responseMessage = result; // Update response message with parsed JSON
//     } else {
//       const result = await response.text(); // Treat non-JSON responses as text
//       console.log("Text response >>>>>>>> ", result);
//       responseMessage = result; // Update response message with text response
//     }

//     console.log("Response message: ", responseMessage);
//     return responseMessage;
//   } catch (error) {
//     console.log('Error:', error);
//     return "Register Failed ";
//   }
// };

  export const getUserStatus = async () => {
    try {
      // const response = await fetch('http://192.168.2.104:8081/api/admin/activationStatus?id=3');
      const response = await fetch('http://192.168.1.5:8081/api/admin/activationStatus?id=2');
      
      console.log("Response status:"+ response.status);
      
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
     return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
}
export const apiGetUserData = async (
  dataToSend: Record<string, any>,
  actionType: any
): Promise<string> => {
  try {
    let url = '';
    let defaultMessage = '';

    if (actionType === 'login') {
      url = 'http://192.168.1.5:8081/api/users/login';
      defaultMessage = 'Login Failed new';
    } else if (actionType === 'register') {
      url = 'http://192.168.1.5:8081/api/users/register';
      defaultMessage = 'Register Failed';
    } else {
      throw new Error('Unsupported action type');
    }

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify(dataToSend);

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const response = await fetch(url, requestOptions);
    console.log('Response status:', response.status);

    const result = await response.text();
    console.log('Result:', result);

    const responseMessage: string = result;
    console.log('Response message:', responseMessage);

    return responseMessage || defaultMessage;
  } catch (error) {
    console.log('Error:', error);
    return 'Failed to perform action';
  }
};
