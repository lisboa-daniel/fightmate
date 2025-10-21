import * as React from 'react';
import { Menu } from '@base-ui-components/react/menu';

import { ArrowCircleDownRounded, DocumentScannerRounded, DownloadRounded, LinkRounded, Settings, Share } from '@mui/icons-material';
import { CharacterIcon } from './characterIcons';
import OutlinedButton from './outlinedButton';
import styles from './baseUI.module.css';
import { Character, InputString } from '../lib/definitions';
import { SelectCharacterIcon } from './customIcons';
import {  ButtonGroup, Link, Tooltip } from '@mui/material';
import { useRouter } from 'next/navigation';
import { saveCombo2Cookies } from '../lib/actions';
var domToImage = require('dom-to-image-more');
import { saveAs } from 'file-saver';


interface CharacterMenuProps {

}

type ButtonProps = {
  icon: React.ReactElement;
  label: string;
  className?: string;
  onClick? : () => void;
};

function Button({ icon, label, className = '', onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={`${className} flex items-center justify-center bg-opacity-0 hover:bg-opacity-20 transition-all border-[1px] bg-transparent outline-0 rounded p-2 min-w-[52px] md:min-h-0 min-h-[52px]`}>
      {icon}
      <div className="hidden md:flex">{label}</div>
    </button>
  );
}

interface ShareComboMenuProps {
  comboData :  InputString[];
}

export default function ShareComboMenu( {comboData} :  ShareComboMenuProps) {
  const router = useRouter();
  const page2Go = (href: string) => {
    if (close) close();
    router.replace(href);
    
  }


  const handlerGeneratePng = async () => {
    let test : Node = (document.getElementById('comboStringContainer') as Node);

    /*setSvgResult(await domToImage.toPng(test, {filter: filter, copyDefaultStyles: false, bgcolor: 'transparent', style: {
        border: 'none',
        marginLeft: '2px'
    }}));*/

    await domToImage.toBlob(test, { bgcolor: 'transparent',width:4000,  scale:4,copyDefaultStyles: false, style: {
      border: 'none',
      
      outline: 'none'
  }}).then(function (blob : Blob) {
    saveAs(blob, `combo: ${new Date().toLocaleDateString()}.png`);
  });
    return new Promise( res => setTimeout(res, 1000) );
}

  const previewImage = async (g : InputString[]) => {
    try{
        saveCombo2Cookies(g);
        
    } catch (err : any ){
      throw new Error("could not do");
      
    }

    page2Go("/preview");
     
  }

  return (
    <Menu.Root>
      
      <Menu.Trigger className={`${styles.Button} bg-[#212121] md:bg-transparent`} style={{
        border: '1px solid #fd3519'

      }}>
     
        <Share className='w-[24px] h-[24px] fill-[#ff5419]'/> 
        <p className='hidden md:flex'>SHARE</p>
      </Menu.Trigger>
      <Menu.Portal >
        <Menu.Positioner className={styles.Positioner + 'z-[-10]'} sideOffset={2}>
          <Menu.Popup className={`${styles.Popup} flex flex-row w-[auto] h-[64px]`} style={{
            backgroundColor: '#141414',
            padding: "6px",
            
            
            outline: "none"
            
          }}>
            
            <ButtonGroup  variant="contained" aria-label="Basic button group">
                <Button className='hover:border-[#30D2FC] mr-2 text-[#30D2FC] border-[#008abd] bg-[#30D2FC] ' label="Share Link" icon={<LinkRounded className='md:mr-2'/>}/>

                <Button className='hover:border-[#FF3D90] mr-2 text-[#FF3D90] border-[#f01266] bg-[#FF3D90]' onClick={() => handlerGeneratePng()} label="Download" icon={<DownloadRounded className='md:mr-2'/>}/>

                <Button className='hover:bg-[#ababab] hover:text-[#ffffff] text-[#ababab] bg-[#ffffff]' onClick={()=> previewImage(comboData)} label="Generate page" icon={<DocumentScannerRounded className='md:mr-2'/>}/>
               

            </ButtonGroup>

          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
