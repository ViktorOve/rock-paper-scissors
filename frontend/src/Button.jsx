import React from "react"

export function Button({text, onClick}){
    return (
      <button onClick={onClick} 
          style={{backgroundColor: 'white', color: 'black', margin: 8}}
        >{text}</button>
    )
  }
