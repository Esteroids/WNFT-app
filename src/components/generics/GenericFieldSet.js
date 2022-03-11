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

    const genericFieldValueChange = (e) => {isError && setIsError('');setGenericFieldValue(e.target.value)}

    const callSetGenericFieldValue = async () => {
        if (props.validator){
          const validate_status = props.validator(genericFieldValue)
          if (!validate_status){
            console.log(validate_status)
            setIsError('error')
            return;
          }
        }
        console.log('isLoading1', isLoading)
        setIsLoading(true);
        console.log('isLoading2', isLoading)
        props.callSet(genericFieldValue).then(() => {setIsLoading(false);console.log('isLoading3', isLoading)}).catch(() => {setIsLoading(false);console.log('isLoading4', isLoading)})
    }


    
    return (    
<div className={props.mainClass || "col-12  my-3"}>
  <label htmlFor={props.genericFieldID} className="form-label">{props.genericFieldLabel}</label>
  <div className="input-group">
    <input type="text" data-tip={props.notOwnerAndNotLogin} disabled={props.notOwner ? 'disabled' : null} className="form-control shadow-lg rounded" name={props.genericFieldID} id={props.genericFieldID}  onChange={genericFieldValueChange} value={genericFieldValue} />
    <button type="submit" data-tip={props.notOwnerAndNotLogin} disabled={props.notOwner ? 'disabled' : null} className="btn btn-secondary" onClick={callSetGenericFieldValue}>SET</button>
  </div>
  { isLoading && (<img src={loading_gif} />)}
  {isError&& (<GenericFieldSetError key={props.genericFieldID + '_input_error'} />)}
</div>)
}

export default GenericFieldSet;