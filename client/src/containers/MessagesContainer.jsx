import React from "react";
import * as axios from "axios";

import { MyMessage, FriendMessage ,StyledDiv} from "./../components/Profile/Chat/styled.jsx"


export class MessagesContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list:props.listItems,
      isNextPageLoading:false,
      oldOffset:0,
      content:React.createRef(),
      iterableArray:[],
      initializedPosition:false,
      prevLengthList:null
    }
  }
  componentDidUpdate(oldProps){
      // IF FIRST RENDER OR CHANGED CHAT TO INITIALIZE START POSTION OF CHAT
      if(oldProps.chatId !== this.props.chatId){
        this.setState({initializedPosition:false});
      }
      
      if (this.refs.content  && this.props.messagesLength > 14 && (this.props.scrollTopChat !== this.refs.content.scrollTop || this.props.scrollTopChat === 0) && !this.state.initializedPosition) {
        
        // SET SCROLL TOP IF CHAT HAS IT"S POSITION OR NOT 
        if(!this.props.scrollTopChat && this.props.scrollTopChat !== 0){
          this.refs.content.scrollTop = this.refs.content.scrollHeight - 596;
        }
        else{
          this.refs.content.scrollTop = this.props.scrollTopChat;
        }
        
        this.setState({oldOffset:this.refs.content.scrollTop});
        // SET SCROLL AFTER ADDING MESSAGE
        this.props.setScroll(false)
        this.setState({initializedPosition:true})
    }
    
    if(this.props.listItems.length !== oldProps.listItems.length){
      
      this.setState({list:this.props.listItems})
    }
    else if(this.props.listItems){
      for(let i = 0;i< this.props.listItems.length;i++){
        if(this.props.listItems[i].text !== oldProps.listItems[i].text){
          this.setState({list:this.props.listItems})
          break;
        }
      }
    }

    
    
    if(oldProps.messagesLength !== this.props.messagesLength){
      const iterableArray = [];
      for(let i =0;i < this.props.messagesLength;i++){
        iterableArray[i] = i;
      }
      this.setState({iterableArray:iterableArray})
    }
    
  }
  componentDidMount(){
      const iterableArray = [];
      
      for(let i =0;i < this.props.messagesLength;i++){
        iterableArray[i] = i;
      }
      this.setState({iterableArray:iterableArray})
  }

 

  // LOAD DATA ON SCROLL EVENT
  loadMoreData = (e) => {
    
    const differenceScroll = this.state.oldOffset - e.target.scrollTop;
    // IF DATA IS LOADING NOT LOAD ANOTHER DATA
    if (this.state.isNextPageLoading && (this.state.prevLengthList !== this.state.list.length || this.state.prevLengthList == null)) {
      console.log("LOADING: ")
      return;
    }
    // NOT LOAD IF SCROLL COME DOWN FULLY
    if (this.props.startIndexMessagesLoaded > this.props.messagesLength) return
    // SAVE POSITION CHAT ON SERVER
    this.props.savePositionChat(e.target.scrollTop);
  
   console.log(differenceScroll)
    if (differenceScroll > 20 && differenceScroll < 230) {
      this.setState({oldOffset:e.target.scrollTop})

      const heightElem = Math.ceil(e.target.offsetHeight / 14);
      const moveIndex = Math.ceil(differenceScroll / (heightElem + 8));
      const prevPage = true;
      if(moveIndex > 7)
    debugger
      if (this.props.startIndexMessagesLoaded - 1 >= 0) {
        this.setState({isNextPageLoading:true});
        // LOAD DATA ON THE NEXT INDEXES 
        console.log("pass")
        this.loadNextPage(this.props.startIndexMessagesLoaded - moveIndex, this.props.startIndexMessagesLoaded, prevPage);
        // SET ACTUAL START INDEX OF FIRST LOADED MESSAGE OF ALL CHAT'S MESSAGES
        this.props.setStartActual(this.props.startIndexMessagesLoaded - moveIndex);
      }
      // SET START AND END INDEXES OF LATEST LOADED MESSAGES
      // if(this.props.startIndex - moveIndex >= 0){
      //   this.props.setStartIndex(this.props.startIndex - moveIndex);
      //   console.log(this.props.startIndexMessagesLoaded)
      //   console.log(this.props.endIndexMessagesLoaded)
      //   this.props.setEndIndex(this.props.startIndex);
      // }
    }
    else if (differenceScroll < -20 && differenceScroll > -240) {
      const heightElem = Math.ceil(e.target.offsetHeight / 14);
      const moveIndex = Math.ceil(-differenceScroll / (heightElem + 8));
      const prevPage = false;
    
      if (this.props.endIndexMessagesLoaded + 1 <= this.props.messagesLength) {
        console.log("pass")
        this.setState({isNextPageLoading:true});
        this.loadNextPage(this.props.endIndexMessagesLoaded, this.props.endIndexMessagesLoaded + moveIndex, prevPage);
        this.props.setEndActual(this.props.endIndexMessagesLoaded + moveIndex)
      }
      // if(this.props.endIndex <= this.props.messagesLength){
      //   this.props.setStartIndex(this.props.endIndex);
      //   this.props.setEndIndex(this.props.endIndex + moveIndex)
      //   console.log(this.props.startIndexMessagesLoaded)
      //   console.log(this.props.endIndexMessagesLoaded)
      // }
      
    }else{
      console.log("LITTLE SCROLL")
    }
  }
  // FETCH PORTION OF MESSAGES AND MERGE WITH OTHERS
  loadNextPage = async (startIndex, endIndex, prevPage) => {

    const response = await axios.post("http://localhost:3001/profile/chat" + this.props.chatId + "/messages", { startIndex, endIndex }).then(response => response.data);
    
    console.log(this.state.list)
    console.log(startIndex)
    console.log(endIndex)
    const list = this.state.list;
    if (response.resultCode === 0) {
      this.setState({prevLengthList:list.length});
      if (prevPage) {
        this.setState({list:[...response.data.messages, ...list]});
      }
      else {
     
        this.setState({list:[...list, ...response.data.messages]});
      }
    }
    this.setState({isNextPageLoading:false});
  }

  messageRenderer = ({ index }) => {

    let isLoading = index < this.props.startIndexMessagesLoaded || index >= this.props.endIndexMessagesLoaded;

    index = index - this.props.startIndexMessagesLoaded;
    if (isLoading) {
      return <div>...</div>
    
    } else if (index < this.state.list.length && this.props.listItems) {
      let contentText =  this.state.list[index].text;
      if ( this.state.list[index].sender === this.props.myName) {
        return <MyMessage key={ this.state.list[index].id}><div>{contentText}</div></MyMessage>
      }
      else {
        return <FriendMessage key={ this.state.list[index].id}><div>{contentText}</div></FriendMessage>
      }
    }
  };
  render(){
    // return <Messages 
    //     content={this.state.content}
    //     loadMoreData={this.loadMoreData.bind(this)}
    //     listItems={this.state.list}
    //     messageRenderer={this.messageRenderer.bind(this)}
    //     iterableArray={this.state.iterableArray}/>
        if (this.state.list.length > 0) {
          console.log("Render: ");
            return (
              <StyledDiv id="area" ref="content" onScroll={
                (e) => {
                  // FIX ERROR WITH PERSIT EVENT SYNTHETIK
                  e.persist();
                  
                  this.loadMoreData(e);
                }
              }>
                {
                  // RENDERING OF LIST MESSAGES AND FILLING EMPTY INDEXES BY LOADING WITH ...
                  this.state.iterableArray && this.state.iterableArray.map((item, index) => this.messageRenderer({ index }))
                }
              </StyledDiv>
            );
          }
          else {
            return ("")
          }
  }
  
  
}