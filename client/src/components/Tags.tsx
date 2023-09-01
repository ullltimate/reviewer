import { Stack, Badge } from "react-bootstrap";
import { changeColor } from "../healpers/healper";

function Tags(props: any){
    return(
        <>
            <Stack direction="horizontal" gap={1} className='flex-wrap'>
				{props.tags.map((el:any, i:any) => 
				<Badge pill bg={`${changeColor()}`} className="bg-opacity-50" key={i}>
    			  {el}
    			</Badge>)}
    		</Stack>
        </>
    )
}
export default Tags