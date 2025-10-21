import * as React from 'react';
import { Menu } from '@base-ui-components/react/menu';

import { ArrowCircleDownRounded, Settings } from '@mui/icons-material';
import { CharacterIcon } from './characterIcons';
import OutlinedButton from './outlinedButton';
import styles from './baseUI.module.css';
import { Character } from '../lib/definitions';
import { SelectCharacterIcon } from './customIcons';
import { Tooltip } from '@mui/material';



interface CharacterMenuProps {
    selectedCharacter : string,
    setCharacter : (character : string) => void
}


export const characters : Character[] = [
    {
        name: "Hotaru Futaba",
        portrait: "hotaru_cotw.webp",
        splash: "hotaru_cotw_splash.png"
    },
    {
        name: "Marco Rodrigues",
        portrait: "marco_cotw.webp",
        splash: "marco_cotw_splash.png"
    },
    {
        name: "B. Jenet",
        portrait: "bjenet_cotw.webp",
        splash: "bjenet_cotw_splash.png"
    },
    {
      name: "Terry Bogard",
      portrait: "terry_cotw.webp",
      splash: "terry_cotw_splash.png"
    },
    {
      name: "Tizoc",
      portrait: "tizoc_cotw.webp",
      splash: "tizoc_cotw_splash.png"
    },
    {
      name: "Rock Haward",
      portrait: "rock_cotw.webp",
      splash: "rock_cotw_splash.png"
    },
    /*{
      name: "Hokutomaru",
      portrait: "hokutomaru_ico.png",
      splash: "hokutomaru_splash.png"
    },*/
    {
      name: "Gato",
      portrait: "gato_cotw.webp",
      splash: "gato_cotw_splash.png"
    },
    /*{
      name: "Freeman",
      portrait: "freeman_ico.png",
      splash: "freeman_splash.png"
    },*/
    /*{
      name: "Jae Hoon",
      portrait: "jae_ico.png",
      splash: "jae_splash.png"
    },*/
    {
      name: "Kevin",
      portrait: "kevin_cotw.webp",
      splash: "kevin_cotw_splash.png"
    },
    {
      name: "Dong Hwan",
      portrait: "dong_cotw.webp",
      splash: "donghwan_cotw_splash.png"
    },
    {
      name: "Vox",
      portrait: "vox_icon.webp",
      splash: "vox_cotw_splash.png"
    },
    {
      name: "Preecha",
      portrait: "preecha_icon.webp",
      splash: "preecha_cotw_splash.png"
    },
    {
      name: "Mai Shiranui",
      portrait: "mai_icon.webp",
      splash: "mai_cotw_splash.png"
    },
    {
      name: "Kain",
      portrait: "kain_icon.webp",
      splash: "kain_cotw_splash.png"
    },
    {
      name: "Billy Cane",
      portrait: "bilycane_icon.webp",
      splash: "billycane_cotw_splash.png"
    },

]


export default function CharacterSelectMenu( {setCharacter, selectedCharacter} : CharacterMenuProps) {

  


  return (
    <Menu.Root>
      
      <Menu.Trigger className={`${styles.Button} bg-[#212121] md:bg-transparent`} style={{
        border: '1px solid #fd3519'

      }}>
     
        <SelectCharacterIcon className='w-[32px] fill-[#ff5419]'/> 
        <p className='hidden md:flex'>CHARACTER SELECT</p>
      </Menu.Trigger>
      <Menu.Portal >
        <Menu.Positioner className={styles.Positioner} sideOffset={8}>
          <Menu.Popup className={`${styles.Popup} grid grid-cols-6 md:grid-cols-12`} style={{
            backgroundColor: 'black',
            padding: "6px",
            
            
            outline: "none"
            
          }}>
            {
                characters.map( (value, index) => (
                    <Menu.Item key={index} style={{
                        cursor: "pointer",
                        outline: "none"
                    }}
                    onClick={() => setCharacter(value.name)}>
                        <CharacterIcon data={value} scale={2} selected={(selectedCharacter==value.name)}/>
                    </Menu.Item>
                ))
            }
            

          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
