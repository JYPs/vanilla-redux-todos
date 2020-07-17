import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

function Detail({ toDo }) {
  return (
    <>
      {/* 이게 되네??? toDo && toDo.text와 동일함!!!! */}
      <h1>{toDo?.text}</h1>
      <h5>Created at : {toDo?.id}</h5>
    </>
  );
}

function mapStateToProps(state, ownProps) {
  const {
    match: {
      params: { id },
    },
  } = ownProps;
  console.log(id);
  return { toDo: state.find((toDo) => toDo.id === Number(id)) };
}

export default connect(mapStateToProps)(Detail);
