import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import GiveUpButton from './GiveUpButton';
import SuccessBox from './SuccessBox';
import LyricSelector from './LyricSelector';
import {cleanText} from './cleanText';

class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.props.onChange(e.target.value);
        this.setState({
            inputValue: e.target.value,
        });
    }

    render() {
        return (
            <input type="text" value={this.props.inputValue} onChange={this.onChange} autoFocus/>
        );
    }
}

class App extends Component {
    constructor() {
        super();
        this.handleInput = this.handleInput.bind(this);
        this.handleGiveUp = this.handleGiveUp.bind(this);

        this.loadLyricsFile('lyrics/seven_nation_army.txt');

        this.state = {
            inputValue: '',
            songTitle: '',
            words: [],
            hasGivenUp: false,
        };
    }

    loadLyricsFile(filePath) {
        axios.get(filePath).then(
            res => {
                this.setWords(res.data);
            }
        );
    }

    setWords(lyrics) {
        const sentences = lyrics.split("\n");
        const title = sentences.shift();

        let i = 0;
        let wordsArray = [];
        sentences.forEach(function (sentence) {
            let isFirstWord = true;
            const words = sentence.split(" ");
            words.forEach(function (word) {
                wordsArray.push({
                    id: i++,
                    wordText: word,
                    isFound: false,
                    isFirstWord: isFirstWord,
                    isGivenUp: false,
                });
                isFirstWord = false;
            });
        });

        this.setState({
            words: wordsArray,
            songTitle: title,
        });
    }

    handleInput(value) {
        const words = this.state.words;
        let newInputValue = value;

        let cleanInputValue = cleanText(newInputValue);

        words.forEach(function (word) {
            if (word.isFound) {
                return;
            }
            let cleanWordText = cleanText(word.wordText);
            if (cleanWordText === cleanInputValue) {

                word.isFound = true;
                newInputValue = '';
            }
        });

        this.setState({
            inputValue: newInputValue,
        });
    }

    handleGiveUp() {
        let words = this.state.words;
        words.forEach(function (word) {
            if (!word.isFound) {
                word.isFound = true;
                word.givenUp = true;
            }
        });
        this.setState({
            words: words,
            hasGivenUp: true,
        });
    }

    handleLoadLyric(fileName) {
        this.loadLyricsFile('/lyrics/' + fileName);
        this.setState({
            hasGivenUp: false,
        });
    }

    getWordCounts(words) {
        let totalWords = 0;
        let wordsFound = 0;

        words.forEach(function (word) {
            if (word.isFound) {
                wordsFound++;
            }
            totalWords++;
        });
        return {
            'found': wordsFound,
            'total': totalWords,
        };
    }

    render() {
        const words = this.state.words;
        const songTitle = this.state.songTitle;
        const inputValue = this.state.inputValue;
        const wordList = words.map((word) => {
            let displayedWord = word.wordText;
            if (!word.isFound) {
                displayedWord = 'xxxx';
            }
            return (
                <span
                    key={word.id}
                    className={(word.isFound ? (word.givenUp ? "isGivenUp" : "isFound") : "isNotFound")
                    + (word.isFirstWord ? " newLine" : "")}
                >
                    {displayedWord}
                </span>
            );
        });
        const wordCounts = this.getWordCounts(words);
        const wordsFound = wordCounts['found'];
        const wordsTotal = wordCounts['total'];
        const foundEverything = (wordsTotal > 0 && wordsFound === wordsTotal) && !this.state.hasGivenUp;

        return (
            <div className="App">
                <div className="App-header">
                    <h2>Name The Lyrics : {songTitle}</h2>
                </div>
                <div className="inputForm">
                    <InputForm
                        inputValue={inputValue}
                        onChange={this.handleInput}
                    />
                </div>
                <div className="progressText">
                    <span>
                        {wordsFound} / {wordsTotal} words found
                    </span>
                </div>
                <SuccessBox
                    active={foundEverything}
                />

                <div className="giveUpButton">
                    <GiveUpButton
                        onClick={this.handleGiveUp}
                    />
                </div>
                <div className="wordList">
                    {wordList}
                </div>
                <div className="otherSongs">
                    <div>
                        try another song:
                    </div>
                    <LyricSelector
                        onClick={(fileName) => this.handleLoadLyric(fileName)}/>
                </div>
            </div>
        );
    }
}

export default App;
