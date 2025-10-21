import { LabelSharp, Settings } from "@mui/icons-material";
import { Button, ButtonProps, ButtonTypeMap, ExtendButtonBase, Tooltip } from "@mui/material";
import { HTMLAttributes, ReactElement } from "react";

interface OutlinedButtonProps {
    label : string,
    icon : ReactElement,
    onClick? : (e: React.MouseEvent<HTMLButtonElement>) => void,
    labelStyle? : string,
    tooltip? : string
    
}


export default function OutlinedButton( {label, icon, onClick, labelStyle, tooltip} : OutlinedButtonProps) {

    return (
        <Tooltip title={tooltip}>
            <Button onClick={onClick} variant='outlined' sx={{marginRight: '8px'}}> 
                <span className="ml-0 md:mr-1 ">{icon}</span>
                <p className={`hidden md:flex ${labelStyle}`}> {label}</p>
            </Button>
        </Tooltip>
    )
}