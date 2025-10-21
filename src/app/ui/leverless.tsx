import React, { ReactElement, useState } from "react";
import OutlinedButton from "./outlinedButton";

type CircleProps = {
    size?: number;
    top: number;
    left: number;
    altText?: string;
    icon? : string
    setInput : (t : string) => void;
};

function Circle({ size = 60, top, left, altText='', icon, setInput } : CircleProps){

    const [activated, setActivated] = useState(1);

    return(


        <button> 
            <div
                
                onClick={() => setInput(altText)}
                className={`bg-[#ccc] hover:bg-[#aaa]`}
                style={{
                   
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    position: "absolute",
                    top,
                    left,
                }}
    
            >
                <span className="flex flex-row justify-center itens-center h-full w-full altText-center altText-black font-extrabold"><img className="p-3" src={icon} alt={altText}/></span>
            </div>
        </button>
        
    );
} 

interface LeverlessProps {
    setInput : (t : string) => void;
}

export default function Leverless ( {setInput} : LeverlessProps) {
  
    const circles = [
        { top: 10, left: 10, altText:"4" , icon: "ar4.svg"}, /* left */
        { top: 10, left: 80, altText:"2",  icon: "ar2.svg" }, /* down */
        { top: 50, left: 140, altText:"6",  icon: "ar6.svg" }, /* right */
        { top: 175, left: 140, altText:"8", size: 80, icon: "ar8.svg" }, /* jump */
        { top: 30, left: 210, altText:"a", icon: "a.svg"}, 
        { top: 20, left: 280, altText:"b", icon: "b.svg"},
        { top: 100, left: 200, altText:"c", icon: "c.svg"}, 
        { top: 90, left: 275, altText:"d", icon: "d.svg"},
        { top: 90, left: 345, altText:"c+d",  icon: "c+d.svg"},
        { top: 20, left: 345, altText:"rev",  icon: "rev.svg"},
        { top: 20, left: 410, altText:"?"},
        { top: 90, left: 410, altText:"?'"},
        
    ];
    console.log(setInput)

    return (
        <div
            style={{
                position: "relative",
                width: 480,
                height: 300,
                padding: 20,
                border: "1px solid #555",
                backgroundColor: "#222",
            }}
        >
            
               
            
            {circles.map((circle, index) => (
                <Circle altText={circle.altText} icon={circle.icon} size={circle.size} top={circle.top} left={circle.left} setInput={setInput}  key={index}/> 
            ))}
        </div>
    );
};