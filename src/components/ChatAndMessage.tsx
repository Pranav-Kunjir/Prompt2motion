// "use client";
// import { useState, useEffect, useRef } from "react";
// import { GoogleGenAI } from "@google/genai";
// import { useMutation, useQuery } from "convex/react";
// import { api } from "../../convex/_generated/api";
// const APIKEY = import.meta.env.VITE_API_KEY;
// const ai = new GoogleGenAI({ apiKey: APIKEY });
// async function GetAiResponse(message: string) {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: `${message}`,
//   });
//   return response.text;
// }

// let newChat = 0;
// export function ChatAndMessage() {
//   const [message, setMessage] = useState("");
//   const [response, setResponse] = useState<string | undefined>("");
//   const createChat = useMutation(api.myFunctions.createChat);
//   const sendMessage = useMutation(api.myFunctions.sendMessage);
//   const { viewer } = useQuery(api.myFunctions.userData, {}) ?? {};
//   const chatCreated = useRef(true);
//   const sentMessage = useRef(false);
//   function handleMessage() {
//     event?.preventDefault();
//     GetAiResponse(message).then((x) => {
//       setResponse(x);
//       if (
//         newChat === 0 &&
//         response &&
//         response?.length > 0 &&
//         response !== ""
//       ) {
//         chatCreated.current = false;
//         newChat += 1;
//       }
//       console.log(response);
//       sentMessage.current = true;
//     });
//   }
//   //TODO:add a way to extract the current chat id maybe redirect to a new page and fix it that way currently new chat gets created empty on prevneted once
//   useEffect(() => {
//     if (viewer && !chatCreated.current) {
//       chatCreated.current = true;
//       createChat({ userID: viewer });
//     }
//   });

//   return (
//     <>
//       <div id="ChatAndMessage">
//         <div id="Chat"></div>
//         <div id="Input">
//           <form onSubmit={handleMessage}>
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             ></input>
//             <button type="submit">SEND</button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }
