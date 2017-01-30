import React from 'react';

class SuccessBox extends React.Component {
    render() {
        if (this.props.active) {
            return (
                <div className="successBox">SUCCESS!!!</div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }
}

export default SuccessBox;
