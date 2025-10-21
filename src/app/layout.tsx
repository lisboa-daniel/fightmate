"use client";

import "./globals.css";

import { GlobalStyles, ThemeProvider, Typography } from '@mui/material';
import { alpha, createTheme, getContrastRatio } from '@mui/material/styles';

import { Montserrat } from 'next/font/google'
import { lime, purple } from '@mui/material/colors';
import Header from "./ui/header";
import StyleDiv from "./ui/styleDiv";
import Divider from '@mui/material/Divider';


import { CommandContext, CommandContextType } from "@/app/context/dictionaryContext";

import { Command} from "@/app/lib/definitions";

import cmdDict from "@/app/lib/cmdDict";
import { useState } from "react";
import Footer from "./ui/footer";

import {theme, mainFont} from '@/app/ui/darkTheme';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [commands, setCommands] = useState<Command[]>(cmdDict()); 
  const [viewHeader, setViewHeader] = useState<boolean>(true);
  const [viewFooter, setViewFooter] = useState<boolean>(true);

  const commandContextValue: CommandContextType = {
    commands,
    setCommands,
    viewFooter,
    viewHeader,
    setViewFooter,
    setViewHeader
  };



  return (
    <CommandContext.Provider value = {commandContextValue}>
      <ThemeProvider theme={theme}>
        <html lang="en">
          <head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          
          </head>
          
          <body style={{backgroundColor: theme.palette.background.default}} className={`${mainFont.className}`}>
            { viewHeader && <Header/> }
            <div className="items-start justify-center md:p-8 p-4 w-full">
              <main className=" w-full flex flex-col justify-center items-start ">
              {children}
              
              
              
              </main>
            </div>

            <Divider orientation="horizontal" flexItem />
            { viewHeader &&  (
              
             
              <Footer/>
              )
            }
            
          </body>

        </html>
      </ThemeProvider>
    </CommandContext.Provider>
  );
}