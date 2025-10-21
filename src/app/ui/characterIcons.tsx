import { Character } from "../lib/definitions";

interface CharacterIconProps {
    scale? : number;
    selected? : boolean;
    data : Character;
}

const default_w = 24;
const default_h = 28;

export function CharacterIcon ( {data, scale=1.0, selected} : CharacterIconProps) {
    return (
    <div className={` border-[4px] ${selected ? " border-[#fd3519]" : "border-transparent"}`}>

        <img alt={data.name} title={data.name} className={`${selected? 'brightness-100' : 'brightness-50' } hover:brightness-100 transition-all `} src={data.portrait}  style={{
                maxWidth: default_w * scale +"px"
             }}/> 

    </div>
    );
}