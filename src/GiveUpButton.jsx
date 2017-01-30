import React from 'react';

class GiveUpButton extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.onClick();
    }

    render() {
        return (
            <button className="giveUpButton" onClick={this.onClick}>I give up!</button>
        );
    }
}

export default GiveUpButton;
