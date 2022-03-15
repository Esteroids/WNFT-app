
function GenericFieldSetError(props){
    const errorMsg = props.errorMsg || "Input is invalid"
    return (
<div className="invalid-input my-1 p-3">
    <div className="search-results-title">Error</div>
    <div className="mt-2">{errorMsg}</div>
</div>);
}

export default GenericFieldSetError;