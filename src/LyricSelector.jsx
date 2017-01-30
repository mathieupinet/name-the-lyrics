import React from 'react';

function LyricsLink(props) {
    return (
        <button className="lyricsLink" onClick={() => props.onClick()}>
            {props.name}
        </button>
    );
}

class LyricSelector extends React.Component {
    renderLyricsLink(name, fileName) {
        return <LyricsLink name={name} onClick={() => this.props.onClick(fileName)} />;
    }
    render() {
        return (
            <div>
                {this.renderLyricsLink('The White Stripes - Seven Nation Army', 'seven_nation_army.txt')}
                {this.renderLyricsLink('The Kills - The Last Goodbye', 'the_last_goodbye.txt')}
                {this.renderLyricsLink('Radiohead - I will', 'i_will.txt')}
                {this.renderLyricsLink('George Michael - Careless Whisper', 'careless_whisper.txt')}
            </div>
        );
    }
}

export default LyricSelector;
