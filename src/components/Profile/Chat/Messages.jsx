import React from "react";

import {  StyledDiv } from "./styled.jsx"

export const  Messages = React.forwardRef(({iterableArray,messageRenderer,listItems,content,loadMoreData}) =>{
   // CHECK ON RECEIVING PROPS WITH LIST
   if (listItems.length > 0) {
    debugger
    return (
      <StyledDiv id="area" ref="content" onScroll={
        (e) => {
          // FIX ERROR WITH PERSIT EVENT SYNTHETIK
          e.persist();
          loadMoreData(e);
        }
      }>
        {
          // RENDERING OF LIST MESSAGES AND FILLING EMPTY INDEXES BY LOADING WITH ...
          iterableArray && iterableArray.map((item, index) => messageRenderer({ index }))
        }
      </StyledDiv>
    );
  }
  else {
    return ("")
  }
});