import { Slider } from "@mui/material";

interface SlideProps {
    label?: string,
    min?: number,
    max?: number,
    value: number,
    setValue? : (value : number) => void,
    step? : number,
    ariaLabel? : string,
    defaultValue?: number

}
 

export default function SliderCustom({min=0.1, max=1, value, setValue=()=>void{}, step=0.1, ariaLabel, defaultValue=0, label=""} : SlideProps) {

    function handleChange(event: Event, value: number | number[], activeThumb: number): void {
        setValue(value as number);
    }
    

    return (
        <span className='flex flex-col w-full md:max-w-[400px] p-2 border-[1px] border-[#fd3519] rounded mb-2'>
            <p className=' text-[#fd3519] w-full text-center '>{label}
            </p>
            <Slider   
            defaultValue={defaultValue}
            min={min}
            max={max}
            value={value}
            onChange={handleChange}
            step={step}
            aria-label="Small"
            valueLabelDisplay="auto">
            </Slider>
            
        </span>
    );
}