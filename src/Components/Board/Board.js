import React, { useState } from "react";
import { MoreHorizontal} from "react-feather";

import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Editable from "../Editabled/Editable";

import "./Board.css";
//import "src/App.js";

function Board(props) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div>
      <div className="board_header">
        <p className="board_header_title">
          {props.board?.title}
        </p>
  
        <div
          className="board_header_title_plus"
          onClick={() => props.addCard(props.board?.id, "New Task")}
        >
          +
        </div>
  
        <div
          className="board_header_title_more"
          onClick={() => setShowDropdown(true)}
        >
          <MoreHorizontal />
          {showDropdown && (
            <Dropdown
              class="board_dropdown"
              onClose={() => setShowDropdown(false)}
            >
              <p onClick={() => props.removeBoard()}>Delete Board</p>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="board">
      <div className="board_cards custom-scroll">
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={props.board.id}
            boardTitle={props.board.title} 
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
          />
        ))}
        <Editable
          text="+ Add Task"
          placeholder="Enter Task Title"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={(value) => props.addCard(props.board?.id, value)}
        />
      </div>
    </div>
    </div>
  );
}

export default Board;
