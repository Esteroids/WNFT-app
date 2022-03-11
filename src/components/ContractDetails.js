 const ContractDetails = (props) => {
    const contractDetails = props.contractDetails
    const isWnftOwner = props.isWnftOwner
    return ( <> <div>
        <label htmlFor="wnft-name">Name</label>

        <div className="input-group mb-3">
          <input type="text" className="form-control" id="wnft-name" name="wnft-name" placeholder="name" value={contractDetails?.name || ''} />
          <div className="input-group-append">
            <button type="submit" className="btn btn-secondary" disabled={!isWnftOwner}>Set</button>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="wnft-symbol">Symbol</label>

        <div className="input-group mb-3">
          <input type="text" className="form-control" id="wnft-symbol" name="wnft-symbol" placeholder="name" value={contractDetails?.symbol || ''} />
          <div className="input-group-append">
            <button type="submit" className="btn btn-secondary" disabled={!isWnftOwner}>Set</button>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="minting-contract-address">WNFT offchain metadata</label>

        <div className="input-group mb-3">
          <input type="text" className="form-control" id="wnft-offchain-metadata" name="wnft-offchain-metadata" placeholder="WNFT offchain metadata CID" value={contractDetails?.wnftOffchainMetadata || ''} />
          <div className="input-group-append">
            <button type="submit" className="btn btn-secondary" disabled={!isWnftOwner}>Set</button>
          </div>
        </div>
      </div>


      <h4 className="mb-3">Minting mechanism</h4>
      <div>
        <label htmlFor="minting-contract-address">Minting contract</label>

        <div className="input-group mb-3">
          <input type="text" className="form-control" id="minting-contract-address" name="minting-contract-address" placeholder="Minting Contract" value={contractDetails?.mintingContract || ''} />
          <div className="input-group-append">
            <button type="submit" className="btn btn-secondary" disabled={!isWnftOwner}>Set</button>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="mint-price">Mint price ($)</label>

        <div className="input-group mb-3">
          <input type="text" className="form-control" id="mint-price" name="mint-price" placeholder="Mint price" value={contractDetails?.mintPrice || ''} />
          
          <div className="input-group-append">
            <button type="submit" className="btn btn-secondary" disabled={!isWnftOwner}>Set</button>
          </div>
        </div>
      </div>     

      <h4 className="mb-3">Mint a token</h4>
      <b> Adam: there are two options: to mint a token with out without a "CID". We didn't know how to design this, but this is the goal here.</b>
     

      <div>
        <label htmlFor="init-cid-to-token">Token ID to mint</label>
        <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Token ID" />
            <div className="input-group-append">
            <button type="submit" className="btn btn-secondary" disabled={!isWnftOwner}>Mint</button>
            </div>
            <div className="input-group-append">
            <button type="submit" className="btn btn-secondary">Can mint?</button>
            </div>
        </div>
      </div>

      <div>
        <label htmlFor="init-cid-to-token">Init CID to token</label>
        <div className="input-group mb-3">
            <input type="text" className="form-control" id="init-cid-to-token" placeholder="IPFS CID" />
            <div className="input-group-append">
            <button type="submit" className="btn btn-secondary" disabled={!isWnftOwner}>Mint</button>
            </div>
            <div className="input-group-append">
            <button type="submit" className="btn btn-secondary">Can mint?</button>
            </div>
        </div>
      </div>



      <h4 className="mb-3">Collection Onchain Metadata</h4>
      <b> Adam: before the input fields should be a list of existing "collection onchain metadata" items. Each item in the list has a 'name' and 'value' </b>

      <div class="row">
          <label for="firstName">Set collection onchain metadata</label>
          <div class="col-md-6 mb-3">
            <input type="text" class="form-control" id="firstName" placeholder="Field name" value="" required="" />
         
          </div>
          <div class="col-md-6 mb-3">
            <input type="text" class="form-control" id="lastName" placeholder="Value" value="" required="" />
          </div>
          <div className="input-group-append">
              <button type="submit" className="btn btn-secondary" disabled={!isWnftOwner}>Set</button>
            </div>
      </div>

      <div>
        <label htmlFor="collection-onchain-metadata">Add field</label>

        <div className="input-group mb-3">
          <input type="text" className="form-control" id="collection-onchain-metadata" name="collection-onchain-metadata" placeholder="Add field"  />
          
          <div className="input-group-append">
            <button type="submit" className="btn btn-secondary" disabled={!isWnftOwner}>Add</button>
          </div>
        </div>
      </div>

      <h4 className="mb-3">Token Onchain Metadata</h4>
      <b> Adam: before the input fields should be a list of existing "token onchain metadata" items. Each item in the list has a 'name', 'value', 'smart contract' and 'interface' properties </b>

      <div class="row">
        <label for="firstName">Set token onchain metadata</label>
        <div class="col-md-12 mb-3">
          <input type="text" class="form-control" id="firstName" placeholder="token ID" value="" required="" />
          </div>
            <div class="col-md-6 mb-3">
            <input type="text" class="form-control" id="firstName" placeholder="Field name" value="" required="" />
           
            </div>
            <div class="col-md-6 mb-3">
            <input type="text" class="form-control" id="lastName" placeholder="Value" value="" required="" />
            
            </div>
            <div className="input-group-append">
              <button type="submit" className="btn btn-secondary" disabled={!isWnftOwner}>Set</button>
            </div>
      </div>

      <div>
        <label htmlFor="collection-onchain-metadata">Add onchain metadata field for tokens</label>
        <div><b> Adam: users need to fill up the three fields below to add a "onchain token metadata"</b></div>

        <div class="row">
            <div class="col-md-6 mb-3">
            <input type="text" class="form-control" id="firstName" placeholder="Field name" value="" required="" />
           
            </div>
            <div class="col-md-6 mb-3">
            <input type="text" class="form-control" id="lastName" placeholder="Smart contract address" value="" required="" />
            
            </div>
            <div className="input-group mb-3 col-md-6">
          <input type="text" className="form-control" id="collection-onchain-metadata" name="collection-onchain-metadata" placeholder="Smart contract signature"  />
          
          <div className="input-group-append col-md-6">
            <button type="submit" className="btn btn-secondary" disabled={!isWnftOwner}>Add</button>
          </div>
        </div>
      </div>
      </div>



      <h4 className="mb-3">Browse Tokens</h4>

        <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="WNFT token ID" />
        <div className="input-group-append">
            <button type="submit" className="btn btn-secondary">Show</button>
        </div>
        </div>

        <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Wallet Address" />
        <div className="input-group-append">
            <button type="submit" className="btn btn-secondary">Fetch Tokens</button>
        </div>
        </div>

      
      <div>
        <label htmlFor="collection-onchain-metadata">Get Nth token</label>
        <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Token number" />
            <div className="input-group-append">
            <button type="submit" className="btn btn-secondary">Show</button>
            </div>
        </div>
      </div>

      <h4 className="mb-3">ENS actions</h4>
      <div>
        <label htmlFor="ens-node-id">ENS node</label>

        <div className="input-group mb-3">
          <input type="text" className="form-control" id="ens-node-id" name="ens-node-id" placeholder="ENS node id" value={contractDetails?.ensNodeId || ''} />
          
          <div className="input-group-append">
            <button type="submit" className="btn btn-secondary" disabled={!isWnftOwner}>Set</button>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="ens-node-id">.eth website CID</label>

        <div className="input-group mb-3">
          <input type="text" className="form-control" id="ens-node-cid" name="ens-node-id" placeholder="ENS node id" value={contractDetails?.ensNodeId || ''} />
          
          <div className="input-group-append">
            <button type="submit" className="btn btn-secondary" disabled={!isWnftOwner}>Set</button>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="ens-resolver">ENS resolver</label>

        <div className="input-group mb-3">
          <input type="text" className="form-control" id="ens-resolver" name="ens-resolver" placeholder="ENS resolver" value={contractDetails?.ensResolver || ''} />
          
          <div className="input-group-append">
            <button type="submit" className="btn btn-secondary" disabled={!isWnftOwner}>Set</button>
          </div>
        </div>
      </div>
      
      <div>
        <label htmlFor="ens-resolver">ENS registrar</label>

        <div className="input-group mb-3">
          <input type="text" className="form-control" id="ens-registrar" name="ens-resolver" placeholder="ENS resolver" value={contractDetails?.ensResolver || ''} />
          
          <div className="input-group-append">
            <button type="submit" className="btn btn-secondary" disabled={!isWnftOwner}>Set</button>
          </div>
        </div>
      </div>

    </>

     )
}

export default ContractDetails