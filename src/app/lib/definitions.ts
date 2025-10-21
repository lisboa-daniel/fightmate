import { ReactElement } from "react"

export type Command = {
    key : string,
    imageFile : string,
    altText : string,
    alias : string[],
    baseSize : number,
}

export type Character = {
    name: string,
    portrait: string
    splash : string
}

export type CommandItem = {
    name : string,
    friendly_name: string,
    combo : string,
    alias: string[],
    
}

export type CommandList = {
    character : string,
    list: CommandItem[]
}


export interface InputString{
    arrayStr : Command[]
    arrayJsx : ReactElement[]
    tooltip : string,
}

export interface MeterCmd {
    cmd : string,
    value : number
}