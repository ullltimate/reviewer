import { Stack, Badge } from "react-bootstrap";
import { changeColor } from "../healpers/healper";

function Tags(props: any){
    const tags = props.tags;
    function removeTag(elem: string, tags: string[]){
        let onTags = tags.filter(function(f) { return f !== elem });
        props.setOnTags(onTags)
    }
    return(
        <>
            <Stack direction="horizontal" gap={1} className='flex-wrap'>
				{tags.filter((el: any)=> typeof el === 'string' && el !== '').map((el:any, i:any) => 
				<Badge role='button' pill bg={`${changeColor()}`} className="bg-opacity-50" key={i} onClick={() => removeTag(el, tags)}>
    			  {el} <i className="bi bi-x"></i>
    			</Badge>)}
    		</Stack>
        </>
    )
}
export default Tags