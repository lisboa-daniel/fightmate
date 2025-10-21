
import { CommandList } from "@/app/lib/definitions";

export const CommandsList : CommandList[] =
[
    {
        character: 'Hotaru Futaba',
        list: [
            {
                name: 'Aerial Turn',
                combo: '[In Air]rev',
                friendly_name: 'Aerial Turn',
                alias: []
            },
            {
                name: 'Hanten Tou',
                combo: '"[In Air]"a+c',
                friendly_name: 'Air Command Grab',
                alias: []
            },
            {
                name: 'Koushuu Da',
                combo: '"[In Air]"2+c',
                friendly_name: 'Air Down + Light Kick',
                alias: []
            },
            {
                name: 'Command Combo 1',
                combo: 'B>6+D>6+D',
                friendly_name: 'Target Combo 1',
                alias: []
            },
            {
                name: 'Command Combo 2',
                combo: '"[In air]"a>c',
                friendly_name: 'Target Combo 2',
                alias: []
            },
            {
                name: 'Hakki Shou',
                combo: '236+a',
                friendly_name: 'Fire Ball light',
                alias: ['236.a', '236a']
            },
            {
                name: 'Hakki Shou',
                combo: '236+b',
                friendly_name: 'Fire Ball heavy',
                alias: ['236.b', '236b']
            },
            {
                name: 'Hakki Shou',
                combo: '236+a+b',
                friendly_name: 'Fire Ball heavy',
                alias: ['236a+b', '236.a+b']
            },
        ]
    }
]
