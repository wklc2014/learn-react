import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Button, Input } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './index.less';

const { TextArea } = Input;

class Index extends Component {

    static defaultProps = {

    }

    constructor(props) {
      super(props);
      this.state = {
        value: '成都...',
        copied: false,
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleCopy = this.handleCopy.bind(this);
    }

    handleChange(e) {
        this.setState({
            value: e.target.value,
            copied: false,
        })
    }

    handleCopy() {
        this.setState({ copied: true });
    }

    render() {
        const { value, copied } = this.state;

        return (
            <div>
                <div className={styles.item} style={{ width: 200 }}>
                    <Input
                        value={value}
                        onChange={this.handleChange}
                    />
                </div>
                <div className={styles.item}>
                    <CopyToClipboard
                        text={value}
                        onCopy={this.handleCopy}
                    >
                        <Button style={{ width: 300, textAlign: 'center' }}>
                            Copy to clipboard with button
                            {copied ? <span style={{color: 'red'}}>Copied.</span> : null}
                        </Button>
                    </CopyToClipboard>
                </div>
                <div>
                    <TextArea placeholder="You can ctrl + V to test." />
                </div>
            </div>
        )
    }

}

Index.propTypes = {

}

export default Index;
