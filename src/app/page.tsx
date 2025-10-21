'use client';

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import StyleDiv from '@/app/ui/styleDiv';
import { Typography } from '@mui/material';

export default function Page() {

  return (
    <div id="content" className="mt-[52px] w-full flex flex-col itens-center justify-center">
        <div className='md:mr-32 md:ml-32 mt-8 mb-2 rounded-lg text-white p-3 bg-[#474747] '>
          <div className='flex flex-col' >  
              <Typography variant='h1'>
               Welcome!
              </Typography>
              
              <p className='text-justify mb-5'>
              Fightmate is a web app made for fighting game players. 
              </p>
             
              <p className='text-justify mb-5'>
              I've made a compilation of various tools to help you while playing fight games. Translate notation of combos to visual notation, export notation to use on other medias or even edit your own combo video using our editor! 
              </p>
              
              <p className='text-justify mb-8'>
              This tool is made to support various types of games, if you have any complaint or suggestion of a game please sent to me! 
              </p>
              
              <p className='text-justify'>
              ~ @Dandy_kyun
              </p>
             
          </div> 
          
          
        </div>
        <div className='w-full flex itens-center justify-center'>
          <img 
            src="/hotaru.gif" 
            alt="Hotaru sprite from fatal fury" 
            className='w-[500px]'
            style={{
              imageRendering: 'pixelated', // 'pixelated' is the equivalent of nearest-neighbor
            }}/>
        </div>
        
    </div>

  );
}
