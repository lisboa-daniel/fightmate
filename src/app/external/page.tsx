'use client';

import { Checkbox, Input, TextareaAutosize, TextField, Tooltip } from "@mui/material";
import StyleDiv from "../ui/styleDiv";
import { Command } from "../lib/definitions";
import { ReactElement, useEffect, useState } from "react";
import { Cookie } from "@mui/icons-material";
import { getComboFromCookies } from "../lib/actions";
import { saveAs } from 'file-saver';
import SliderCustom from "../ui/slider";
import { CommandContextType, useCommand } from "../context/dictionaryContext";
var domToImage = require('dom-to-image-more');

interface inputString{
    arrayStr : Command[]
    arrayJsx : SVGRectElement[]
    tooltip : string,
}

interface MeterCmd {
    cmd : string,
    value : number
}


export default function Page(){

    const { setViewHeader, setViewFooter } = useCommand();

    
    function filter(node : any) {
        console.log(node.tagName)
        return node.tagName  === 'IMG';
    }

    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }

    const handlerGeneratePng = async () => {
        let test : Node = (document.getElementById('imageArea') as Node);
    
        /*setSvgResult(await domToImage.toPng(test, {filter: filter, copyDefaultStyles: false, bgcolor: 'transparent', style: {
            border: 'none',
            marginLeft: '2px'
        }}));*/
    
        await domToImage.toBlob(test, { bgcolor: '#272727',width:comboBoxSize,  scale:outputScale,copyDefaultStyles: false, style: {
          border: 'none',
          
          outline: 'none'
      }}).then(function (blob : Blob) {
        saveAs(blob, `combo: ${new Date().toLocaleDateString()}.png`);
      });
        return new Promise( res => setTimeout(res, 1000) );
    }
      

    useEffect(  () => {
        setViewHeader(false);
        setViewFooter(false);
        handleGetCombo();
        
    }, []);

    let [translatedGrouped, setTranslatedGrouped] = useState<inputString[]>([]);
    const [iconSize, setIconSize] = useState(1);

    const [comboBoxSize, setComboBoxSize] = useState(1366);
    const [outputScale, setOutputScale] = useState(2);
    const [oneCol, setOneCol] = useState(false);
    const [hiddenLink, setHiddenLink] = useState(false);
    
    let linkCmd : Command= {
        key: "lnk", altText: "Link", imageFile: "commands/" + "link.svg", alias: [],
        baseSize: 48 + iconSize
    }
    

    function generateCommandIcon(id : number, cmd : Command): ReactElement {
        if (cmd.imageFile != 'none'){
            return (         
                    
                <img key={id} style={{
                    pointerEvents: "none"
                }} className='ml-1 mr-1'  width={cmd.baseSize * iconSize + "px"} alt={cmd.altText} src={cmd.imageFile} />
                
            )
        } 

        

        return <p style={{fontSize: cmd.baseSize * iconSize + "px"}} className='' key={id}>{cmd.altText}</p>
    }
    
    async function handleGetCombo() {
        const promiseCombo = await getComboFromCookies();

        if (promiseCombo != undefined){
            setTranslatedGrouped(promiseCombo);
         

            //handlerGeneratePng();
           
        }
            
        else
            window.alert("no combo");
        
    }

    return(
        <div id="content" className="mt-[52px] w-full flex flex-col">
                <div className="flex flex-col md:flex-row items-center">
                <span className="m-3 w-full md:w-auto">
                    <TextField value={outputScale} onChange={(e) => setOutputScale(parseInt(e.target.value))} type="number" className="" label="Image Scale" />
                </span> 
                <span className="m-3 w-full md:w-auto">
                    <SliderCustom label="Icon Size" min={0.2} max={4} value={iconSize} setValue={setIconSize}/>
                </span>
                <span className="m-3 w-full md:w-auto">
                    <SliderCustom  step={100} label="Combo box size" min={350} max={10000} value={comboBoxSize} setValue={setComboBoxSize}/>
                </span>

                <span className="m-3 w-full md:w-auto">
                    <div className="rounded border-[1px] flex flex-row items-center justify-start p-3 border-primary-400">

                    
                        <Checkbox  value={oneCol} onChange={(e) => setOneCol(e.target.checked)}/>
                        <label className="text-primary-400">One Column</label>

                    </div>

                </span>

                <span className="m-3 w-full md:w-auto">
                    <div className="rounded border-[1px] flex flex-row items-center justify-start p-3 border-primary-400">

                    
                        <Checkbox  value={hiddenLink} onChange={(e) => setHiddenLink(e.target.checked)}/>
                        <label className="text-primary-400">Hide links</label>

                    </div>

                </span>
            </div>
           <div id='comboStringContainer' className='flex justify-start mb-2  p-3 bg-transparent ' style={
                        {
                            display: 'flex',
                            flexDirection: (oneCol) ? 'column' : 'row',
                            flexWrap: (oneCol) ? 'nowrap' : 'wrap',

                        }
                        }>
                            
                    
                        {
                            translatedGrouped.map( (value, index) => (
                                <Tooltip key={index} title={value.tooltip}>
                                <div  id={'comboStrings'} className='flex flex-row'>
                                <StyleDiv  style={{ alignItems:'center', justifyContent:"start", 'display':'flex',  height:"auto", minWidth:240 * iconSize +"px", width: 'auto', flexWrap: 'wrap',
                                background: "rgba(46,46,46,0.2)", flexDirection: 'row',
                                    "&:hover": {
                                        background: "rgba(65,65,65,0.5)"
                                    },

                                    

                                    }}>

                                    {
                                    value.arrayStr.map((cmd, index) => {
                                        return (
                                            generateCommandIcon(index, cmd)
                                        );
                                    })
                                    }                      
                                    
                                                        
                                    
                                </StyleDiv>
                                {

                                    (translatedGrouped.length>1 && index != translatedGrouped.length-1 && !hiddenLink) &&(
                                        <img className='ml-1 mr-1' width={linkCmd.baseSize * iconSize} alt={"link"} src={linkCmd.imageFile} />
                                    )
                                }
                            
                                </div>
                                </Tooltip>
                                
                            ))
                        }
            </div>

                      
                  
        </div>
       
    )
}