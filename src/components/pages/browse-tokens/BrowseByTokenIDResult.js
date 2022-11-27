import BrowseByTokenIDResultShow from "./BrowseByTokenIDResultShow";
import BrowseByTokenIDNotFound from "./BrowseByTokenIDNotFound";

function BrowseByTokenIDResult(props) {
  return (
    <div className="search-results my-3 p-3">
      <div className="search-results-title">Result</div>
      {props.tokenSearchResults &&
        props.tokenSearchResults?.id &&
        props.tokenSearchResults?.tokenExists && (
          <BrowseByTokenIDResultShow
            tokenID={props.tokenSearchResults?.id.toString()}
          />
        )}
      {props.tokenSearchResults &&
        props.tokenSearchResults?.tokenExists === false && (
          <BrowseByTokenIDNotFound />
        )}
    </div>
  );
}

export default BrowseByTokenIDResult;
