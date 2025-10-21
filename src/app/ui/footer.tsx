import { GitHub, Twitter } from "@mui/icons-material";
import { Divider, Typography } from "@mui/material";

export default function Footer(){
    return(
        <footer className="mt-auto text-white bg-black p-8 flex flex-col md:flex-row items-center justify-center w-full" arial-label="footer"  >

              <a href="#" className="bg-[#474747]  pt-2 pr-1 pl-1 pb-2 md:p-2 rounded-lg text-center flex flex-row mb-4 md:mb-0" >
              <Twitter className="w-12 mr-2"/> 
              <Typography component='span'> </Typography>
                <Typography component='span'>
                  <p className="font-bold ">Created by @dandy_kyun </p>
                </Typography>
              

              </a>
              <Divider className="hidden md:flex" sx={{marginLeft: '8px', marginRight: '8px'}} orientation="vertical" flexItem />
            
              <a href="#" className="bg-[#474747] p-2 rounded-lg text-center flex flex-row">

              
              <GitHub className="w-12 mr-2"/> 
              <Typography component={'span'}>
                <p > Check out the repository </p>
              </Typography>

              </a>
              
            </footer>
    );
}