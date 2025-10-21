import { Command } from "./definitions";

export default function cmdDict(): Command[] {
  return [
    { key: "1", altText: "Up", imageFile: "1.svg", alias: [], baseSize: 64 },
    { key: "2", altText: "Down", imageFile: "2.svg", alias: ['cr'], baseSize: 64 },
    { key: "214", altText: "QuarterHalfBack", imageFile: "214.svg", alias: [], baseSize: 64 },
    { key: "236", altText: "QuarterHalfForward", imageFile: "236.svg", alias: ['qhf', 'qhb'], baseSize: 64 },
    { key: "3", altText: "DiagonalDownForward", imageFile: "3.svg", alias: [], baseSize: 64 },
    { key: "4", altText: "Left", imageFile: "4.svg", alias: [], baseSize: 64 },
    { key: "412", altText: "QuarterHalfBackwardInverse", imageFile: "412.svg", alias: [], baseSize: 64 },
    { key: "421", altText: "ZBackward", imageFile: "421.svg", alias: [], baseSize: 64 },
    { key: "426", altText: "HalfCircleForward", imageFile: "426.svg", alias: [], baseSize: 64 },
    { key: "4268", altText: "FullCircle", imageFile: "4268.svg", alias: [], baseSize: 64 },
    { key: "478", altText: "Dunno", imageFile: "478.svg", alias: [], baseSize: 64 },
    { key: "5", altText: "Neutral", imageFile: "5.svg", alias: [], baseSize: 64 },
    { key: "6", altText: "Forward", imageFile: "6.svg", alias: [], baseSize: 64 },
    { key: "623", altText: "Neutral", imageFile: "623.svg", alias: [], baseSize: 64 },
    { key: "624", altText: "Neutral", imageFile: "624.svg", alias: [], baseSize: 64 },
    { key: "6248", altText: "Neutral", imageFile: "6248.svg", alias: [], baseSize: 64 },
    { key: "632", altText: "Neutral", imageFile: "632.svg", alias: [], baseSize: 64 },
    { key: "698", altText: "Neutral", imageFile: "698.svg", alias: [], baseSize: 64 },
    { key: "7", altText: "Neutral", imageFile: "7.svg", alias: [], baseSize: 64 },
    { key: "8", altText: "Neutral", imageFile: "8.svg", alias: ['j'], baseSize: 64 },
    { key: "874", altText: "Neutral", imageFile: "874.svg", alias: [], baseSize: 64 },
    { key: "896", altText: "Neutral", imageFile: "896.svg", alias: [], baseSize: 64 },
    { key: "9", altText: "Neutral", imageFile: "9.svg", alias: [], baseSize: 64 },
    { key: ">", altText: "FollowUp", imageFile: "arrowforward.svg", alias: [], baseSize: 24 },
    { key: "a", altText: "LightPunch", imageFile: "buttonA.svg", alias: [], baseSize: 64 },
    { key: "b", altText: "HeavyPunch", imageFile: "buttonB.svg", alias: [], baseSize: 64 },
    { key: "c", altText: "LightKick", imageFile: "buttonC.svg", alias: [], baseSize: 64 },
    { key: "d", altText: "HeavyKick", imageFile: "buttonD.svg", alias: [], baseSize: 64 },
    { key: "k", altText: "AnyKick", imageFile: "kick.svg", alias: [], baseSize: 64 },
    { key: "p", altText: "AnyPunch", imageFile: "punch.svg", alias: [], baseSize: 64 },
    { key: ".", altText: ".", imageFile: "dot.svg", alias: [], baseSize: 24 },

    { key: "k", altText: "AnyKick", imageFile: "kick.svg", alias: [], baseSize: 64 },
   
    { key: "+", altText: "Plus", imageFile: "plus.svg", alias: [], baseSize: 24 },

    { key: "rev", altText: "RevGuard", imageFile: "revguard.svg", alias: [], baseSize: 64 },
    { key: "cl", altText: "Close", imageFile: "cl.svg", alias: [], baseSize: 64 }
  ];
}



