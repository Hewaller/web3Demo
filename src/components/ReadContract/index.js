import React, { Component } from 'react';
import { Collapse, Button, Input } from 'antd';
import styles from './index.less';
import Web3_hpb from '../../../public/web3_hpb/lib/web3_hpb';
const { Panel } = Collapse;

class Read extends Component {
  constructor(props) {
    super(props);
    const { abi = '', address } = this.props;

    // const originData = abi;
    const data = abi.filter(item => item.constant);
    // console.log(data);
    const activeKey = data.map(item => item.name);
    this.state = {
      data,
      activeKey,
      originData: abi,
      address,
      MyContract: '',
    };
  }

  componentDidMount() {
    this.init();
  }
  // 初始化数据
  init = async () => {
    const { data: abi, address } = this.state;
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
            return (abi[key].result = value.toString());
          } else {
            // console.log(item.name);
          }
        });
        this.setState({ data: abi });
      },
    );
  };

  changeInput = (index, i, event) => {
    const value = event.target.value;
    const { data } = this.state;
    data[index].inputs[i].value = value;
    this.setState({ data });
  };
  // 折叠
  changeCollapse = key => {
    this.setState({
      activeKey: key,
    });
  };
  search = (index, methodName) => {
    const { data, MyContract } = this.state;
    const { inputs } = data[index];
    let arr = [],
      bollean = true;
    inputs.forEach(item => {
      if (item.value) {
        arr.push(item.value);
      } else {
        bollean = false;
        return;
      }
    });
    if (!bollean) {
      // input 都需要填写
      console.log('必填');
      return;
    }
    // console.log(MyContract[methodName](...arr).toString());
    let d = '';
    try {
      d = MyContract[methodName](...arr).toString();
    } catch (error) {
      d = 'error';
    }
    data[index].result = d;
    this.setState({
      data,
    });
  };
  render() {
    const { data = [], activeKey = [] } = this.state;
    return (
      <div className={styles.readerContainer}>
        <Collapse expandIconPosition={'right'} onChange={this.changeCollapse} activeKey={activeKey}>
          {data.map((item, index) => (
            <Panel header={`${index + 1}. ${item.name}`} key={item.name}>
              <div className={styles.readerItemContainer}>
                {item.inputs.length ? (
                  <div>
                    {item.inputs.map((it, i) => (
                      <div key={i}>
                        <div className={styles.inputTitle}>{`${it.name || 'input'}(${
                          it.type
                        })`}</div>
                        <Input
                          className={styles.inputContainer}
                          onChange={this.changeInput.bind(this, index, i)}
                          placeholder={`${it.name || 'input'}(${it.type})`}
                        />
                      </div>
                    ))}
                    <Button onClick={() => this.search(index, item.name)} className={styles.search}>
                      Query
                    </Button>
                    {item.outputs.length && (
                      <div className={styles.tip}>
                        {/* <img
                          src={require('../../assets/images/shape.svg')}
                          alt=""
                          className={styles.tipImg}
                        /> */}
                        {item.outputs[0].name} <i>{item.outputs[0].type}</i>
                      </div>
                    )}
                    {item.result && (
                      <div>
                        <div>
                          [ <b>{item.name}</b> method Response ]
                        </div>
                        <div>
                          <b>{item.name} </b> <i>{item.outputs[0].type}: </i>
                          <b>{item.result}</b>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {item.outputs.map((it, i) => (
                      <div key={i}>
                        <b>{item.result}</b> <i className={styles.italic}>{it.type}</i>
                      </div>
                    ))}
                    {/* <div></div> */}
                  </div>
                )}
              </div>
            </Panel>
          ))}
        </Collapse>
      </div>
    );
  }
}

export default Read;
