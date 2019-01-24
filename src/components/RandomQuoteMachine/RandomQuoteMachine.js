import React, { Component } from 'react';
import './RandomQuoteMachine.css';
import axios from 'axios';

export default class RandomQuoteMachine extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            isLoading: true,
            quote: '',
            author: ''
        }
    }
    
     componentDidMount() {
           axios.get('https:gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
           .then(response => {
             const quotes = response.data;
             let randomQuotes = quotes.quotes[Math.floor(Math.random() * quotes.quotes.length)]
             let { quote, author } = randomQuotes;
             
             this.setState({ 
                 data: quotes.quotes, 
                 isLoading: false,
                 author: author,
                 quote: quote
             });
           });
           this.initializeColors();
       }

       // set text color and background color
       initializeColors = () => {
            let randomRGBA = this.randomColor();
            document.getElementById('quote-box').style.color = randomRGBA;
            document.body.style.backgroundColor = randomRGBA;
        }
      
        getRandomQuotes = () => {
           const newArray = [...this.state.data];
           let randomQuote = newArray[Math.floor(Math.random() * newArray.length)];
           const { quote, author } = randomQuote;

           this.setState({
               quote: quote,
               author: author
           });
          this.initializeColors();
      }
      
      randomColor = () => {
        const colors = [
            'rgba(245, 30, 50, 0.4)', 
            'rgba(93, 184, 54, 0.5)',
            'rgb(64, 57, 183)', 
            'rgba(46, 8, 46, 0.8)',
            'rgba(35, 215, 248, 0.9)',
            'rgba(84, 70, 215, 0.9)',
            'rgba(105, 109, 145, 0.9)',
            'rgba(112, 167, 151, 0.8)',
            'rgba(184, 23, 76, 0.4)',
            'rgba(19, 64, 23, 0.5)',
            'rgba(14, 199, 252, 0.5)',
            'rgba(101, 49, 94, 0.7)',
            'rgba(70, 142, 18, 0.5)'
        ];
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        return randomColor;
      }

    render() {
        let text;
        if(!this.state.isLoading){
            text = (
                 <div>
                     <div id="text" className="mb-3 d-flex align-items-center">
                         <i className="fas fa-quote-left fa-2x mr-5"></i>
                         <p className="mb-0">
                             {this.state.quote}
                         </p>
                     </div>
                     <div id="author" className="text-right my-5">
                         - {this.state.author}
                     </div>
                 </div>
            )
        } else {
            text = <h3>Loading...</h3>;
        }
        // set href attribute for twitter
        const twitterOutput = `https://www.twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${this.state.quote}${this.state.author}`;

            return (
                <div id="quote-box">
                  {text}
                    <footer className="d-flex justify-content-between">
                        <div id="tweet-quote">
                            <a href={twitterOutput}>
                                <i className="fab fa-twitter fa-3x mr-3"></i>
                            </a>
                        </div>
                        <button id="newQuote" onClick={this.getRandomQuotes} className="btn btn-success px-4">
                            New Quote
                </button>
                    </footer>
                </div>
        );
    }
};
