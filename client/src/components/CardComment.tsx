import { Card } from "react-bootstrap"


function CardComment(props:any) {


  	return (
  	  <>
		<Card className="border-0">
            <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">{props.nameUser}</Card.Subtitle>
                <Card.Text>
                    {props.comment}
                </Card.Text>
            </Card.Body>
        </Card>
  	  </>
  	)
}

export default CardComment