import React from 'react'
import AppHeader from './app-header';
import Game from './tictactoe-game';


const _component=(props)=>{

    return (
        <div>
            <AppHeader title="Tic Tac Toe"/>
            <Game/>
        </div>
    );

}

class component extends React.Component{
    constructor(props){
        super(props);

        this.state={
            Owins:0,
            Xwins:0,
            ties:0
        }
    }

    handleGameEnd = (winner, tie)=>{
        if(winner)
            winner==='O'?this.setState({Owins:this.state.Owins+1}):this.setState({Xwins:this.state.Xwins+1});
        if(tie)
            this.setState({ties:this.state.ties+1});
    }

    render(){
        return (
                <div>
                    <AppHeader title="Tic Tac Toe"/>
                    <table className="table2"> 
                        <thead>
                            <th>Played</th>
                            <th>O Wins</th>
                            <th>X Wins</th>
                            <th>Ties</th>
                        </thead>

                        <tbody>
                            <td>{this.state.Owins+this.state.Xwins+this.state.ties}</td>
                            <td>{this.state.Owins}</td>
                            <td>{this.state.Xwins}</td>
                            <td>{this.state.ties}</td>
                        </tbody>
                    </table>
                    <Game onGameEnd={this.handleGameEnd}/>
                </div>
        );
    }
}

export default component;