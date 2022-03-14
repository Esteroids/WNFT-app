import { useState, useEffect } from "react";
import GenericFieldSetError from "./GenericFieldSetError"
const loading_gif = require("../../images/Loading_Animation.gif");

function GenericFieldSet(props){
    const [genericFieldValue, setGenericFieldValue] = useState(props.initFieldValue || '');
    const [isError, setIsError] = useState(''); 
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(()=>{
        setGenericFieldValue(props.initFieldValue || '')
    }, [props.initFieldValue])

    const genericFieldValueChange = (e) => {
      isError && setIsError('');
      setGenericFieldValue(e.target.value);
    }

    const genericFieldKeyPress = (e) => { e.key === 'Enter' && callSetGenericFieldValue();}

    const callSetGenericFieldValue = async () => {
        if (props.validator){
          const validate_status = props.validator(genericFieldValue)
          if (!validate_status){
            console.log(validate_status)
            setIsError('error')
            return;
          }
        }
        setIsLoading(true);
        props.callSet(genericFieldValue).then(() => {setIsLoading(false);}).catch(() => {setIsLoading(false);})
    }

    const buttonLabel = props.buttonLabel || 'SET'

    const fieldLabelElement = !props.emptyLabel && (<label htmlFor={props.genericFieldID} className="form-label">{props.genericFieldLabel}</label>)
    
    return (    
<div className={props.mainClass || "col-12  my-3"}>
  {fieldLabelElement}
  <div className="input-group">
    <input type="text" data-tip={props.notOwnerAndNotLogin} disabled={props.notOwner ? 'disabled' : null} className="form-control shadow-lg rounded" name={props.genericFieldID} id={props.genericFieldID}  onChange={genericFieldValueChange} onKeyPress={genericFieldKeyPress} value={genericFieldValue} />
    <button type="submit" data-tip={props.notOwnerAndNotLogin} disabled={props.notOwner ? 'disabled' : null} className="btn btn-secondary" onClick={callSetGenericFieldValue}>{buttonLabel}</button>
  </div>
  { isLoading && (<img src={loading_gif} />)}
  {isError&& (<GenericFieldSetError key={props.genericFieldID + '_input_error'} />)}
</div>)
}

export default GenericFieldSet;