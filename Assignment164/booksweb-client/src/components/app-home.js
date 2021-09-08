import React from 'react';


// const component = ()=>{

    // return <div className='body'>
    //     <h2>Home!</h2>
    //     <p>Welcome to the Book's web Home page.</p>
    //     <p>Here you will find all about books</p>
    //     <img className='coverimage' src='/images/coverpage.jpg' alt="Book's Home"/>
    // </div>

// };



export default class component extends React.Component{
    constructor(props){
        super(props);

        this.state={
            imgUrl:"https://i.pinimg.com/originals/7a/07/5a/7a075ae77e31249f5585f38cbeb77dd0.jpg",
            initQuote: "One glance at a book and you hear the voice of another person, perhaps someone dead for 1,000 years. To read is to voyage through time."
        };
    }

    handleClick=()=>{
       let urls=[
            "https://i.pinimg.com/originals/7a/07/5a/7a075ae77e31249f5585f38cbeb77dd0.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Books_HD_%288314929977%29.jpg/1280px-Books_HD_%288314929977%29.jpg",
            "https://wallpapercave.com/wp/wp2036897.jpg",
            "https://wallpapercave.com/wp/wp2297884.jpg",
            "https://wallpaperaccess.com/full/124493.jpg"
        ];

        let quotes=[
            "One glance at a book and you hear the voice of another person, perhaps someone dead for 1,000 years. To read is to voyage through time.",
            "The library is inhabited by spirits that come out of the pages at night.",
            "Sleep is good, he said, and books are better.",
            "A book is a version of the world. If you do not like it, ignore it; or offer your own version in return.",
            "Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten."
        ];

        let uIndx = Math.floor(Math.random()*urls.length);
        let qIndx = Math.floor(Math.random()*quotes.length);

        this.setState({
            imgUrl:urls[uIndx],
            initQuote:quotes[qIndx]                                                         
        });
        console.log(urls[uIndx], quotes[qIndx]);
        console.log(this.state);
    }

    render(){
        return (
            <div className='body'>
                <h2>Home!</h2>
                <p>Welcome to the Book's web Home page.</p>
                <p>Here you will find all about books</p>
                <img className='coverimage' src={this.state.imgUrl} alt="Book's Home"/>
                <p>{this.state.initQuote}</p>
                <button onClick={this.handleClick}>Refresh</button>
            </div>
        );
    }
}