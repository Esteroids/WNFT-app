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

    const genericFieldKeyDown = (e) => { e.key === 'Enter' && callSetGenericFieldValue();}

    const callSetGenericFieldValue = async () => {
      setIsError('');
        if (props.validator){
          const validate_status = props.validator(genericFieldValue)
          console.log(validate_status)
          if (!validate_status.valid){
            console.log(validate_status)
            setIsError(validate_status.msg)
            return;
          }
        }
        setIsLoading(true);
        props.callSet(genericFieldValue)
        .then(() => {
          setIsLoading(false);
        })
        .catch((e) => {setIsLoading(false);setIsError(e)})
    }

    const buttonLabel = props.buttonLabel || 'SET'

    const fieldLabelElement = !props.emptyLabel && (<label htmlFor={props.genericFieldID} className="form-label">{props.genericFieldLabel}</label>)
    
    return (    
<div className={props.mainClass || "col-12  my-3"}>
  {fieldLabelElement}
  <div className="input-group">
    <input type="text" data-tip={props.notOwnerAndNotLogin} disabled={props.notOwner ? 'disabled' : null} className="form-control shadow-lg rounded" name={props.genericFieldID} id={props.genericFieldID}  onChange={genericFieldValueChange} onKeyDown={genericFieldKeyDown} value={genericFieldValue} placeholder={props.placeholder} />
    <button type="submit" data-tip={props.notOwnerAndNotLogin} disabled={props.notOwner ? 'disabled' : null} className="btn btn-secondary" onClick={callSetGenericFieldValue}>{buttonLabel}</button>
  </div>
  { isLoading && (<img src={loading_gif} />)}
  {isError&& (<GenericFieldSetError key={props.genericFieldID + '_input_error'} errorMsg={isError} />)}
</div>)
}

export default GenericFieldSet;