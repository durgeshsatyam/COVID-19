import React, { Component } from 'react';


import { Icon } from 'react-icons-kit';
import { angleDoubleRight } from 'react-icons-kit/fa/angleDoubleRight';

import Styles from './home.module.css';
import Test from './test';
import List from './list';
import {getQue, saveResult} from './script.js'
import clsx from 'clsx';
import { number } from 'prop-types';

const currentQID = "current Question Id";
const score = "score";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
      currentQuestionIndex: Number(localStorage.getItem(currentQID)) || 0,
      isResult: false,
      isAnswered : false,
      selectedOption : null,
      
    };
  }
  componentDidMount() {
    // TODO: fetch user data using id if url contains id
  }

  _changeQuestionId = () => {
    
    this.setState({ currentQuestionIndex: this.state.currentQuestionIndex + 1, isAnswered: false });
    
    
    const userCurrentQID = Number(localStorage.getItem(currentQID)) || 0;
    localStorage.setItem(currentQID, userCurrentQID + 1)
  }
  _resetQuestionId = () => {
    this.setState({ currentQuestionIndex: 0 });
    localStorage.setItem(currentQID, 0)
    this.setState({isResult: true});

  }

  _saveResult = (value, rightAnswer) => {
    
    this.setState({selectedOption :value })
    //localStorage.clear()
    localStorage.setItem(this.state.currentQuestionIndex, value);
    this.setState({isAnswered: true});
    if (value === rightAnswer) {
      const currentScore = localStorage.getItem(score) || 0;
      localStorage.setItem(score, Number(currentScore) + 1);
    }
    

  }

  _isAnswered = () => {
    this.setState({isAnswered: true});
    
  }
  _resetQuestioniare = () => {
    this.setState({isResult: false});
    localStorage.setItem(score, 0);
  }

  
  _fetchUser = (id) => {
    // Fetch user data
  }

  setActive = (value) => {
    this.setState({ isActive: value });
    
  }
  render() {
    /**
     * TODO: separate UI components,
     * Create User
     * Questionaire doesn't exist: create questionaire
     * Questionaire exists: attempt questionaire
    * */

    const que = getQue(this.state.currentQuestionIndex);
    if (typeof que.selectedItems=== "undefined") {
      this._resetQuestionId();
      
    }
    if (this.state.isResult === true)
    {

      return ( <div className={Styles.root}>
      <List/>
     
        <div className={Styles.container}>
         <Test />
           <div onClick={this._resetQuestioniare} >
            Restart this test!!
           </div>
           </div>
           </div>

           );
    }
    
    console.log(this.state.isActive, que);
    
    return (
      <div className={Styles.root}>
      <List/>
     
        <div className={Styles.container}>
          <div className={Styles.questionAnswerContainer}>
            <span className={Styles.question}> {que.selectedItems}  </span>
            
            <div className={Styles.answerContainer}>
            </div>
            <div> <br></br>
            </div>
            <div className={clsx(Styles.answerContainer, { [Styles.rightAnswer]: que.ans === que.opt1 && this.state.isAnswered ?true: false ,
               [Styles.wrongAnswer]: que.ans !== que.opt1 && this.state.isAnswered && this.state.selectedOption == que.opt1 ?true : false 
            })}>
              <div  onClick={() => this._saveResult(que.opt1, que.ans)} className={Styles.answerButton}>
                <div id="opt1">
                  {que.opt1} 
                </div>
              </div>
            </div>
            <div> <br></br>
            </div>
            <div  className={clsx(Styles.answerContainer, { [Styles.rightAnswer]: que.ans ===que.opt2 && this.state.isAnswered ?true: false ,
               [Styles.wrongAnswer]: que.ans !== que.opt2 && this.state.isAnswered && this.state.selectedOption == que.opt2 ?true : false 
            })}>
              <div  onClick={() => this._saveResult(que.opt2, que.ans)} className={Styles.answerButton}>
                <div id="opt2">
                  {que.opt2}
                </div>
              </div>
            </div>
            <div> <br></br>
            </div>
            <div  className={clsx(Styles.answerContainer, { [Styles.rightAnswer]: que.ans === que.opt3 && this.state.isAnswered ?true: false ,
               [Styles.wrongAnswer]: que.ans !== que.opt3 && this.state.isAnswered && this.state.selectedOption == que.opt3 ?true : false 
            })}>
              <div  onClick={() => this._saveResult(que.opt3, que.ans)} className={Styles.answerButton}>
                <div id="opt3">
                 {que.opt3}
                </div>
              </div>
            </div>
            <div> <br></br>
            </div>
            <div  className={clsx(Styles.answerContainer, { [Styles.rightAnswer]: que.ans ===que.opt4 && this.state.isAnswered ?true: false ,
               [Styles.wrongAnswer]: que.ans !== que.opt4 && this.state.isAnswered && this.state.selectedOption == que.opt4 ?true : false 
            })}>
              <div  onClick={() => this._saveResult(que.opt4, que.ans)} className={Styles.answerButton}>
                <div id="opt4"> 
                {que.opt4}                
                </div>
              </div>
            </div>
            {
              this.state.isAnswered
                ? (
                  <div onClick={ this._changeQuestionId } className={Styles.skipButton}>
                  <span className={Styles.skip}>Next</span>
                  <Icon className={Styles.skipIcon} size={27} icon={angleDoubleRight} />
                </div>
                )
                : ''
            }
           
          </div>
          
          
        </div>
      </div>
      
    );
  }
}
