import React, { Component } from 'react';
import Web3_hpb from '../../../public/web3_hpb/lib/web3_hpb';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contract: '',
    };
  }
  componentDidMount() {
    // const  = require('../../../public/web3_hpb/lib/web3_hpb');
    const web3_hpb = new Web3_hpb(new Web3_hpb.providers.HttpProvider('/mainnetApi'));
    console.log(web3_hpb);
    const abi = [
      {
        constant: true,
        inputs: [],
        name: 'canAnyMint',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'getOwner',
        outputs: [
          {
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'owner',
        outputs: [
          {
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getAuthTokenByTokenId',
        outputs: [
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'primaryItem',
            type: 'string',
          },
          {
            name: 'secondaryItem',
            type: 'string',
          },
          {
            name: 'extItem',
            type: 'string',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        name: 'authTokenIndexs',
        outputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            name: '',
            type: 'address',
          },
        ],
        name: 'minters',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
    ];
    const address = '0x4a950abc3f958a2cd03c201cbdafacd82608ebbc';
    const MyContract = web3_hpb.hpb.contract(abi);
    const myContractInstance = MyContract.at(address);
    console.log(myContractInstance);
    this.setState({
      contract: myContractInstance,
    });
    const result = myContractInstance.canAnyMint();
    const result2 = myContractInstance.getOwner();
    const result3 = myContractInstance.owner();
    const result4 = myContractInstance.getOwner();
    // const result5 = myContractInstance.minters.call(Number(232));
    console.log(result, result2, result3, result4);
    // console.log(myContractInstance.authTokenIndexs(16579517055253348798759097));
  }
  handClick = () => {
    // const { contract } = this.state;
    // const result = contract.authTokenIndexs(0x4a950abc3f958a2cd03c201cbdafacd82608ebbc).call();
    // console.log(result);
  };
  render() {
    return <div onClick={() => this.handClick()}>click</div>;
  }
}

export default Home;
