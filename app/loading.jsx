import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
    const loadingstyle = {
        fontSize: "15vw",
        color: "#000",
        animation: "spin 1s linear infinite"


    }
    const container = {
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"

    }
  return (
    <div style={container}>
        <AiOutlineLoading3Quarters style={loadingstyle}/>
    </div>
  )
}

export default Loading