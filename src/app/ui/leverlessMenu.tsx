import * as React from 'react';
import { Menu } from '@base-ui-components/react/menu';

import { ArrowCircleDownRounded, Settings, VideogameAssetRounded } from '@mui/icons-material';
import { CharacterIcon } from './characterIcons';
import OutlinedButton from './outlinedButton';
import styles from './baseUI.module.css';
import { Character } from '../lib/definitions';
import { SelectCharacterIcon } from './customIcons';
import { Tooltip } from '@mui/material';
import Leverless from './leverless';



interface LeverlessMenuProps {
    setInput : (t : string) => void
}

export default function LeverlessMenu( {setInput} : LeverlessMenuProps) {

  
  return (
    <Menu.Root>
      
      <Menu.Trigger className={`${styles.Button} bg-[#212121] md:bg-transparent`} style={{
        border: '1px solid #fd3519'

      }}>
     
        <VideogameAssetRounded 
            sx={
                {
                    width: '52px',
                    height: '52px'
                }
            }/>
      </Menu.Trigger>
      <Menu.Portal >
        <Menu.Positioner className={styles.Positioner} sideOffset={8}>
          <Menu.Popup className={`${styles.Popup} w-[480px] grid grid-cols-6 md:grid-cols-12`} style={{
            backgroundColor: 'black',
            padding: "6px",
            
            
            outline: "none"
            
          }}>
            <Leverless setInput={setInput}/>
            

          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
