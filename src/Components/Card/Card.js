import React, { useState } from "react";
import { Clock, MoreHorizontal } from "react-feather";
import Dropdown from "../Dropdown/Dropdown";
import CardInfo from "./CardInfo/CardInfo";
import "./Card.css";

function Card(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { id, title, date, labels } = props.card;

  const formatDate = (value) => {
    if (!value) return "";

    const date = new Date(value);
    if (isNaN(date)) return "";

    const today = new Date();
    const yesterday = new Date(today);
    const tomorrow = new Date(today);
    //yesterday.setDate(today.getDate() - 1);
    tomorrow.setDate(today.getDate() + 1);

    //if (date.toDateString() === yesterday.toDateString()) {
      //return "Yesterday"; }
      if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else if (date < yesterday) {
      return <span style={{ color: 'red' }}>Missed</span>;
    } else {
      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      return `${date.getDate()} ${months[date.getMonth()]}`;
    }
  };

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={props.card}
          boardId={props.boardId}
          updateCard={props.updateCard}
        />
      )}
      <div
        className="card"
        draggable
        onDragEnd={() => props.dragEnded(props.boardId, props.card.id)}
        onDragEnter={() => props.dragEntered(props.boardId, props.card.id)}

        onClick={() => setShowModal(true)}
      >
        <div className="card_top">
        <div className="card_board_title">{props.boardTitle}</div> 
          
          <div
            className="card_top_more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown
                class="board_dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={() => props.removeCard(props.boardId, id)}>
                  Delete Card
                </p>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card_title">{title}</div>
        <div className="card_footer">
          {date && (
            <p className="card_footer_item">
              <Clock className="card_footer_icon" />
              {formatDate(date)}
            </p>
          )}
         
          <div className="card_bottom_labels">
            {labels?.map((item, index) => (
              <label key={index} style={{ backgroundColor: item.color }}>
                {item.text}
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
