'use client';

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import StyleDiv from '@/app/ui/styleDiv';
import { CloseRounded, Cookie, Help, InfoRounded, OpenInNewRounded, ReceiptLong, Settings, Share, VideogameAsset, VideogameAssetRounded } from '@mui/icons-material';
import { ReactElement, useContext, useEffect, useState } from 'react';
import OutlinedButton from '../ui/outlinedButton';
import { Character, Command, MeterCmd, InputString } from '../lib/definitions';
import cmdDict from '../lib/cmdDict';
import { characters } from '../ui/characterSelectMenu';
import CharacterSelectMenu from '../ui/characterSelectMenu';
import SliderCustom from '../ui/slider';
import { Button, Checkbox, LinearProgress, Modal, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material';
import { Gauge } from '@mui/x-charts';
import { CommandsList } from '../lib/characterCommandList';
import LeverlessMenu from '../ui/leverlessMenu';
import ShareComboMenu from '../ui/shareComboMenu';

import { useRouter } from 'next/navigation';


export default function Home() {
    

    const games = ["Fatal Fury City Of The Wolves"];
    const noCharacter : Character = {
        
        name: "No character Selected",
        portrait: 'default.png',
        splash : 'default.png'
        
    }



    
    const meterCmd: MeterCmd[] = [
        { cmd: '214214+a', value: 1 },
        { cmd: '214214+b', value: 2 },
        { cmd: '214214+c', value: 1 },
        { cmd: '214214+d', value: 2 },
        { cmd: '236236+a', value: 1 },
        { cmd: '236236+b', value: 2 },
        { cmd: '236236+c', value: 1 },
        { cmd: '236236+d', value: 2 },
        { cmd: '236236+rev', value: 2 },
        { cmd: '214214+rev', value: 2 }
      ];

    const [comboMeter, setComboMeter] = useState(0);
    const [SPG, setSPG] = useState(false);
    const [selectedCharacterName , setSelectedCharacterName] = useState("");
    const [selectedCharacterData , setSelectedCharacterData] = useState(noCharacter);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [oneCol, setOneCol] = useState(false);
    const [hiddenLink, setHiddenLink] = useState(false);

    const onChangeCharacter = (name : string) => {
        if (name != selectedCharacterName)
            setSelectedCharacterName(name);
        else
            setSelectedCharacterName("");
            
    }

    const [useDots, setUseDots] = useState(false);
    const router = useRouter();
    const [comboInput, setComboInput] = useState('j.d, cl.5d,5d.rev,5.b,214+a, 623+b.rev, 236.p+p, 214p.+p, 214.k+k, j>214.k+k > b+d."( air rev blow)"');
    let [translatedGrouped, setTranslatedGrouped] = useState<InputString[]>([]);
    
    const page2Go = (href: string) => {
        
    
        router.replace(href);
        
    }
    const onChangeComboInput = (input : string ) => {
        setComboInput(input.toLowerCase())
    }

    const onAddComboInput = (t : string) => {
        setComboInput(comboInput + t);

    }

    const [iconSize, setIconSize] = useState(1);
   
  

    const [commands, setCommands] = useState<Command[]>(cmdDict());
    let linkCmd : Command= {
        key: "lnk", altText: "Link", imageFile: "commands/" + "link.svg", alias: [],
        baseSize: 48
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
      setAnchorEl(null);
    };

    const [showComboStats, setShowComboStats] = useState<string>('none');
    const handleComboStats = (
        event: React.MouseEvent<HTMLElement>,
        
      ) => {
        setShowComboStats(showComboStats=="none" ? "show": "none");
      };

    function isCommand(cmd : string){
        const command: Command | undefined = commands.find(_cmd => _cmd.alias.includes(cmd) || _cmd.key == cmd);
        if (command != undefined){

            return {
                key: command.key,
                altText: command.altText,
                imageFile: "commands/" + command.imageFile,
                alias : command.alias,
                baseSize: command.baseSize

            }
        
        }

        return undefined;
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

    useEffect( () => {
        let _selectedCharacterData = characters.findIndex( char => char.name == selectedCharacterName)

        if (_selectedCharacterData >= 0){
            setSelectedCharacterData(characters[_selectedCharacterData])
            setComboInput(comboInput+" ");

        } else 
            setSelectedCharacterData(noCharacter);

       

    }, [selectedCharacterName])

    function countOccurrences(str: string, subStr: string): number {
        let count = 0;
        let position = 0;

        while ((position = str.indexOf(subStr, position)) !== -1) {
            count++;
            position += subStr.length;
        }
    
        return count;
    }

    useEffect(() => {
        // Split by commas but don't trim spaces inside quotes
        let splitInput = comboInput.match(/"[^"]*"|[^,]+/g)?.map(part => part.trim()) || [];
        
        // Prepare the output block
        let clearOutput: InputString[] = [];
    
        // Define symbols that act as separators
        const separators = ['+', '>', '.'];
    
        // Reset meter usage
        setComboMeter(0);
    
        // Calculate meter usage based on special occurrences
        let meter = 0;
        meterCmd.forEach(cmd => {
            let occr = countOccurrences(comboInput, cmd.cmd);
            meter += cmd.value * occr;
        });
        setComboMeter(meter);

        if (!SPG) {
            if ( (countOccurrences(comboInput, "b+d")) || (countOccurrences(comboInput, "d+b")) )
                setSPG(true);
        }
    
        // Process each block of the input
        splitInput.forEach(cmd => {
            let groupedCmds: Command[] = [];
    
            // Split while keeping quoted text and separators intact
            const parts = cmd.match(/"[^"]*"|[^\+>\.]+|[+>.]/g) || [];
    
            parts.forEach((part) => {
                if (part.startsWith('"') && part.endsWith('"')) {
                    // Handle quoted commentary (remove quotes, but keep spaces)
                    const textContent = part.slice(1, -1);
                    groupedCmds.push({
                        key: textContent,
                        altText: textContent,
                        imageFile: 'none',
                        baseSize: 48,
                        alias: [],
                    });
                } else if (separators.includes(part)) {
                    // Handle separators
                    const sepCmd = isCommand(part);
                    if (sepCmd) {
                        groupedCmds.push(sepCmd);
                    }
                } else {
                    // Handle standard commands
                    let command = isCommand(part);
                    if (command) {
                        groupedCmds.push(command);
                    } else {
                        // Attempt to break into multiple valid commands
                        let foundPartial = false;
                        for (let i = part.length; i > 0; i--) {
                            let firstPart = part.slice(0, i);
                            let secondPart = part.slice(i);
    
                            let cmd1 = isCommand(firstPart);
                            let cmd2 = isCommand(secondPart);
    
                            if (cmd1 && cmd2) {
                                groupedCmds.push(cmd1, cmd2);
                                foundPartial = true;
                                break;
                            }
                        }
    
                        // Fallback to character splitting
                        if (!foundPartial) {
                            part.split("").forEach(_cmd => {
                                const charCmd = isCommand(_cmd);
                                if (charCmd) {
                                    groupedCmds.push(charCmd);
                                } else {
                                    // If still not found, push as plain text
                                    groupedCmds.push({
                                        key: _cmd,
                                        altText: _cmd,
                                        imageFile: 'none',
                                        baseSize: 48,
                                        alias: [],
                                    });
                                }
                            });
                        }
                    }
                }
            });

            // try to identify tooltips!

            let tooltip = 'Simple Command'
            let commandString = ''
            
            groupedCmds.forEach( cmd => {
                commandString += cmd.key
            })

            const usableList = CommandsList.find(list => list.character == selectedCharacterName);

            if (usableList != undefined){
                let possible_tip = usableList.list.find(_cmd => 
                    _cmd.combo === commandString || 
                    _cmd.alias.some(alia_command => alia_command === commandString)
                  );

                if (possible_tip != undefined)
                    tooltip = possible_tip.name;
            }

            

            // Push the processed group if it's not empty
            if (groupedCmds.length > 0) {
                clearOutput.push({
                    arrayJsx: [],
                    arrayStr: groupedCmds,
                    tooltip: tooltip
                });
            }

            
        });
    
        setTranslatedGrouped(clearOutput);
        
    }, [comboInput]);
    
    
    
  
    return (
        <div id="content" className="mt-[52px] mb-14 w-full items-center justify-center ">
            <div className='pt-2 flex mb-2 flex-wrap '>
               
                {/* Quick Buttons Panel*/}
                <StyleDiv style={{ justifyContent : 'center', border: 'none'}} width='100%' height='52px'>
                        
                        <OutlinedButton onClick={() => setSettingsOpen(true)} label="Settings" icon={<Settings sx={{width:'20px'}}/>}/>

                        
                        
                        <OutlinedButton label="Command List" icon={<ReceiptLong sx={{width:'20px'}}/>} onClick={() => window.alert("soon")}/>

                        <OutlinedButton label="Help" icon={<Help sx={{width:'20px'}} onClick={() => window.alert("soon")}/>}/>
            
                       
                </StyleDiv>
            </div>

            {/* Main combo form*/}
            <Divider flexItem orientation='horizontal' />
            <form id='combo_form' className="flex flex-col md:flex-row items-start justify-start mb-2">
                <div className="flex flex-row w-full md:w-[300px] ">           
                    <TextField
                        id="filled-select-game"
                        select
                        label="Game"
                        defaultValue="Fatal Fury City Of The Wolves"
                        helperText="Please select your game"
                        variant="filled"
                        color='primary'
                        sx={{minWidth:  '100%', marginTop: '10px'}}
                    
                    >
                        {games.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                        ))}
                    </TextField>
                </div>

                <span className="mt-3 md:ml-3 w-full ">
                <TextField  value={comboInput} onChange={(e) => onChangeComboInput(e.currentTarget.value)} className=" w-full" label="Input your combo" />
                </span> 
                
                <span className="mt-5 md:ml-3  ">
            

                <LeverlessMenu setInput={onAddComboInput}/>
                </span>
                      
                 
            </form>
            
            {/* Icon size bar */}
            <div className='flex flex-row  items-center justify-center p-0'>
                <SliderCustom 
                min={0.2} label={"Icon Size"} max={4} value={iconSize} setValue={setIconSize}/>
            </div>
            
            <Divider flexItem orientation='horizontal' />
            
            {/* Visual Combo Result */}
            <StyleDiv style={{minHeight:"300px", alignItems:'start', justifyContent: 'start', display:'flex', flexWrap: 'wrap'}} aria-label="comboresult" key="combo_result" width="auto" height="auto">
                <div className='flex flex-row justify-start mb-2 w-full'>
                    {/*2A,5A,5A,214+A*/}
                    
                    <div
                        id="comboMainContainer"
                        className="relative flex flex-col w-full border-[0px] border-[#414141] p-3 characterBackground bg-right-top bg-no-repeat"
                        style={{
                            backgroundImage: `url('/${selectedCharacterData.splash}')`,
                        
                        }}
                    >
                        <span className='flex flex-row'>

                    
                            <span className='w-auto md:w-[520px] p-2 bg-[#ff5419] bg-opacity-75 mb-4'>
                                <p className='text-left text-sm md:text-2xl  text-[#ffffff]  font-extrabold '> {selectedCharacterData.name} </p>

                                
                            </span>
                            
                            <span className="ml-3 flex flex-row ">
                            
                            <CharacterSelectMenu selectedCharacter={selectedCharacterName} setCharacter={onChangeCharacter}/>
                            
                            
                            </span>
                        </span>
    
                    <div id="comboHeadContainer" className='flex flex-col md:flex-row w-full justify-start p-1 md:p-3'>
              
           
                        <span className="md:w-auto w-full">
                            <TextField className='w-full bg-black bg-opacity-45 md:bg-transparent'  defaultValue={"Row 1"} label="Combo Name" />
                        </span>


                        <span className="md:w-auto w-full mt-2 md:mt-0">

                        
                            <div className='flex flex-row md:ml-3 md:mt-1'>
                                <OutlinedButton
                                    label={''}
                                    onClick={() => setSPG(!SPG)}
                                    icon={
                                        <img src="spg_icon.svg"
                                        className={`${SPG ? '' : 'grayscale'}`}>


                                        </img>
                                    }
                                    tooltip='Enable S.P.G'
                                    labelStyle='font-extrabold'
                                />
                              
                            
                            </div>
                           
                        </span>

                        

                        
                    </div>
                    
                    <span className='flex flex-row justify-start items-center'>
                           
                           <Button onClick={() => page2Go('/external')}><OpenInNewRounded/> <p className='ml-2'>Open in a new tab</p></Button>
                       </span>

                    <div id='comboStringContainer' className='flex flex-wrap justify-start mb-2 ' style={
                        {
                            display: 'flex',
                            flexDirection: (oneCol) ? 'column' : 'row',
                            flexWrap: (oneCol) ? 'nowrap' : 'wrap',

                        }
                    }>
                       
                        {
                            translatedGrouped.map( (value, index) => (
                                <Tooltip key={index} title={value.tooltip}>
                                <div  className='flex flex-row w-auto'>
                                <StyleDiv style={{ alignItems:'center', justifyContent:"start", 'display':'flex', padding: 0, width:'auto', height:"auto", flexWrap: 'wrap',
                                background: "rgba(46,46,46,0.2)",
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
                    <Divider flexItem orientation='horizontal' />
                    <div className='pt-2 flex mb-2 flex-wrap '>
                        
                        {/* Quick Buttons Panel*/}
                        <StyleDiv style={{ alignContent: 'center', justifyItems: 'center', justifyContent : 'space-evenly', border: 'none'}} width='100%'  height='52px'>
                                
                                {/*<OutlinedButton label="Share" icon={<Share sx={{width:'20px'}}/>}/>*/}
                                <ShareComboMenu comboData={translatedGrouped}/>
                                

                                <ToggleButtonGroup
                                    value={showComboStats}
                                    exclusive
                                    onChange={handleComboStats}
                                    aria-label="Show combo info"
                                    >
                                    <ToggleButton sx={{height: '40px'}} value="show">
                                        <InfoRounded className='mr-0 md:mr-2'/> <p className='hidden md:flex'> Show combo info</p>
                                    </ToggleButton>
                                    
                                </ToggleButtonGroup>
  

                               
                            
                        </StyleDiv>
                    </div>

                    {/* Quick Buttons Panel*/}
                    <div className={` mb-2 transition-all ease-in-out ${showComboStats=='show' ? 'flex h-[250px]' : 'flex h-[0px]'} pt-2 mb-2 flex-wrap $ `} 
                    >
                
                        
                        <StyleDiv style={{ display: 
                            showComboStats=='show'  ? 'flex' : 'none'
                        , flexDirection: 'column'}} height='auto' width='100%' >
                       
                        <div className='w-full h-auto flex flex-col justify-center items-center'>
                               <span className='flex flex-col items-center justify-center mb-4 mr-4 h-24'>
                                    <p className='font-bold text-sm text-center'>Estimate Rev Usage (waiting for framedata)</p>
                                    <Gauge width={100} height={100} value={60} startAngle={-90} endAngle={90} />
                               </span>
                               <span className='mb-6 mr-2 h-6 flex flex-col justify-center items-center'>
                                    <p className='font-bold  text-sm mb-3'>Meter usage</p>
                                    <div className='flex flex-row'>

                                    <span className='w-[96px] mr-2'>
                                        <LinearProgress color={comboMeter>2 ? 'error' : 'primary'} variant="determinate" value={
                                            (comboMeter>=1) ? 100 : 0
                                        } />
                                    </span>
                                   
                                    <span className='w-[96px]'>
                                        <LinearProgress color={comboMeter>2 ? 'error' : 'primary'} variant="determinate" value={(comboMeter>=2) ? 100 : 0} />
                                    </span>
                                    

                                    </div>

                                    <span>
                                        <Typography color='error'>{(comboMeter > 2) ? 'Meter exceding maximum bars available' : ''}</Typography>
                                    </span>
                                    
                               </span>

                               <span className='flex flex-col items-center justify-center mb-1 mr-4 h-12'>
                                    <p className='font-bold text-center text-sm'>Estimate damage (waiting for framedata)</p>
                                    0000
                               </span>
                        </div>
                        </StyleDiv>
                    </div>
                    </div>
                </div>

                <p className='w-full text-[12px] text-center'>All characters images shown are property of ©SNK COPORATION ALL RIGHTS RESERVED. And its used personally at fair use only, without any profit.</p>
            </StyleDiv>

            <Modal
                open={settingsOpen}
                onClose={()=> setSettingsOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >

                    <div className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[95%] md:w-[600px] shadow-xl p-4 bg-black bg-opacity-75 border-[1px] rounded border-primary-400 flex flex-col'>
                        <div className='w-full flex flex-row'>
                            <span className='flex-row justify-start items-start'>
                                <Typography variant='h2'>
                                    Settings
                                </Typography>
                            </span>
                            <span className='ml-auto flex-row justify-end items-end'>
                                <Button onClick={()=> setSettingsOpen(false)}><CloseRounded /></Button>
                            </span>
                        </div>

                        <span className="m-3 w-full md:w-auto">
                            <div className="rounded border-[1px] flex flex-row items-center justify-start p-3 border-primary-400">

                            
                                <Checkbox checked={oneCol} onChange={(e) => setOneCol(e.target.checked)}/>
                                <label className="text-primary-400">One Column</label>

                            </div>

                        </span>

                        <span className="m-3 w-full md:w-auto">
                            <div className="rounded border-[1px] flex flex-row items-center justify-start p-3 border-primary-400">

                            
                                <Checkbox  checked={hiddenLink} onChange={(e) => setHiddenLink(e.target.checked)}/>
                                <label className="text-primary-400">Hide links</label>

                            </div>

                        </span>
                    </div>
            </Modal>                            
            {/*<IFramePreview/>*/}
        

                
        </div>
  );
}

