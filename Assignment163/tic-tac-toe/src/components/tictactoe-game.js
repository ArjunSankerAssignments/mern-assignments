import React from 'react'
import StatusMessage from './status-message';
import TicTacToeBoard from './tictactoe-board';
import Game from '../service/game';


class component extends React.Component {

    constructor(props){
        super(props);
        this.game=new Game();
        this.state= {...this.game, status:'Next Move "O', moveList:[]};
    }

    getInitialState=()=>{
        return {
            cells:[  null,null,null,
                     null,null,null,
                     null,null,null
                ],
            next:'O',  
            winner:null,          
            status:'Next Move "O"',
            moveList:[]
        }
    }

    handleCellClick=(id)=>{

        if(this.game.move(id)){

            this.setState({cells:[...this.game.cells]});

            let moveList = this.state.moveList;

            moveList.push({
                player:this.state.next,
                position:id
            });

            this.setState({moveList:[...moveList]});

            if(this.game.winner){
                this.setState({status:`"${this.game.winner}" Wins`});
                this.setState({winner:this.game.winner, winningCombo:this.game.winningCombo});
                this.setState({moves:9});
                this.props.onGameEnd(this.game.winner, false);
                return ;
            }

            if(this.game.isStalemate()){
                this.setState({status:"Game is Stalemate"});
                this.props.onGameEnd(false, true);
                return ;
            }

            this.setState({next: this.game.next});
            this.setState({moves:this.game.moves});

        }


    }

    reset=()=>{
        //this.setState(this.getInitialState());
        this.game.reset();
        this.setState({...this.game, status:`Next Move : "O"`, moveList:[]});
    }

    render(){
        console.log('this.state',this.state);
        
        return (
            <div>
            <div className="sideBy">
                <StatusMessage message={this.state.status} moves={this.state.moves} />
                <TicTacToeBoard cells={this.state.cells} 
                                winner={this.state.winner}
                                winningCombo={this.state.winningCombo}
                                onCellClick={this.handleCellClick}
                />
                <button onClick={this.reset} >Reset</button>
            </div>

            <div className="sideBy">
                    <table className="table1">
                        <thead>
                            <th>Move</th>
                            <th>Player</th>
                            <th>Position</th>
                        </thead>

                        <tbody>
                            {
                                this.state.moveList.map((move,idx)=>
                                    <tr>
                                        <td>{idx+1}</td>
                                        <td>{move.player}</td>
                                        <td>{move.position}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default component;