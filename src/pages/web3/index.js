import React, { Component } from 'react';
import Web3_hpb from '../../../public/web3_hpb/lib/web3_hpb';
import ReadContract from '../../components/ReadContract';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contract: '',
      abi: [
        {
          constant: true,
          inputs: [
            {
              name: 'interfaceId',
              type: 'bytes4',
            },
          ],
          name: 'supportsInterface',
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
          name: 'name',
          outputs: [
            {
              name: '',
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
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'getApproved',
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
          constant: false,
          inputs: [
            {
              name: 'to',
              type: 'address',
            },
            {
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'approve',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: '_owner',
              type: 'address',
            },
          ],
          name: 'setOwner',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'totalSupply',
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
          constant: false,
          inputs: [
            {
              name: 'from',
              type: 'address',
            },
            {
              name: 'to',
              type: 'address',
            },
            {
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'transferFrom',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              name: 'owner',
              type: 'address',
            },
            {
              name: 'index',
              type: 'uint256',
            },
          ],
          name: 'tokenOfOwnerByIndex',
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
          inputs: [],
          name: 'delegateCount',
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
          constant: false,
          inputs: [
            {
              name: 'from',
              type: 'address',
            },
            {
              name: 'to',
              type: 'address',
            },
            {
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'safeTransferFrom',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              name: 'index',
              type: 'uint256',
            },
          ],
          name: 'tokenByIndex',
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
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'ownerOf',
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
              name: 'owner',
              type: 'address',
            },
          ],
          name: 'balanceOf',
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
              name: 'id',
              type: 'uint256',
            },
          ],
          name: 'getTokenDelegate',
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
              name: '',
              type: 'uint32',
            },
          ],
          name: 'delegates',
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
          constant: false,
          inputs: [
            {
              name: 'delegateID',
              type: 'uint32',
            },
            {
              name: 'to',
              type: 'address',
            },
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
          name: 'mint',
          outputs: [
            {
              name: '',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'nonpayable',
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
          inputs: [],
          name: 'symbol',
          outputs: [
            {
              name: '',
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
          constant: false,
          inputs: [
            {
              name: 'to',
              type: 'address',
            },
            {
              name: 'approved',
              type: 'bool',
            },
          ],
          name: 'setApprovalForAll',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'tokenMetadataBaseURI',
          outputs: [
            {
              name: '',
              type: 'string',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: 'from',
              type: 'address',
            },
            {
              name: 'to',
              type: 'address',
            },
            {
              name: 'tokenId',
              type: 'uint256',
            },
            {
              name: 'data',
              type: 'bytes',
            },
          ],
          name: 'safeTransferFrom',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              name: '_tokenId',
              type: 'uint256',
            },
          ],
          name: 'tokenURI',
          outputs: [
            {
              name: '',
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
          name: 'authTokens',
          outputs: [
            {
              name: '',
              type: 'uint32',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: 'delegate',
              type: 'address',
            },
          ],
          name: 'addDelegate',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              name: 'owner',
              type: 'address',
            },
            {
              name: 'operator',
              type: 'address',
            },
          ],
          name: 'isApprovedForAll',
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
          constant: false,
          inputs: [
            {
              name: 'to',
              type: 'address',
            },
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
          name: 'mintWithDefault',
          outputs: [
            {
              name: '',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              name: 'id',
              type: 'uint32',
            },
          ],
          name: 'getDelegate',
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
          anonymous: false,
          inputs: [
            {
              indexed: true,
              name: 'delegate',
              type: 'address',
            },
            {
              indexed: true,
              name: 'delegateID',
              type: 'uint32',
            },
          ],
          name: 'DelegateAdded',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              name: 'delegateID',
              type: 'uint32',
            },
            {
              indexed: true,
              name: 'to',
              type: 'address',
            },
            {
              indexed: true,
              name: 'name',
              type: 'string',
            },
          ],
          name: 'Mint',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              name: 'from',
              type: 'address',
            },
            {
              indexed: true,
              name: 'to',
              type: 'address',
            },
            {
              indexed: true,
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'Transfer',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              name: 'owner',
              type: 'address',
            },
            {
              indexed: true,
              name: 'approved',
              type: 'address',
            },
            {
              indexed: true,
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'Approval',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              name: 'owner',
              type: 'address',
            },
            {
              indexed: true,
              name: 'operator',
              type: 'address',
            },
            {
              indexed: false,
              name: 'approved',
              type: 'bool',
            },
          ],
          name: 'ApprovalForAll',
          type: 'event',
        },
      ],
      address: '0x63586a9c8bedef7e5feeb12f10b7ca4129af30c8',
      data: [],
      MyContract: '',
    };
  }
  componentDidMount() {
    const { abi } = this.state;
    const data = abi.filter(item => item.constant);
    this.setState(
      {
        abi: data,
      },
      // () => {
      //   this.init();
      // },
    );
  }

  init = async () => {
    const { abi, address } = this.state;
    const web3_hpb = new Web3_hpb(new Web3_hpb.providers.HttpProvider('/mainnetApi'));
    const MyContract = web3_hpb.hpb.contract(abi).at(address);
    console.log(MyContract);
    this.setState(
      {
        MyContract,
      },
      () => {
        abi.forEach((item, key) => {
          if (!item.inputs.length) {
            const value = MyContract[item.name]();
            return (abi[key].results = value.toString());
          } else {
            // console.log(item.name);
          }
        });
        console.log(abi);
        this.setState(abi);
      },
    );
  };

  handClick = () => {
    const { MyContract } = this.state;
    // console.log(MyContract.supportsInterface('123').toString());
    // console.log(MyContract.getApproved('1').toString());
    // console.log(MyContract.tokenOfOwnerByIndex('1', '2').toString());
    console.log(MyContract.tokenByIndex('1').toString());
  };
  render() {
    const { abi, address } = this.state;
    return (
      <div style={{ textAlign: 'left' }}>
        {!!abi && !!address && <ReadContract abi={abi} address={address} />}
        {/* {!!abi.length &&
          abi.map((item, i) => (
            <div key={i}>
              {item.name} ----- {item.results}
            </div>
          ))} */}
        <div onClick={() => this.handClick()}>click</div>
      </div>
    );
  }
}

export default Test;
