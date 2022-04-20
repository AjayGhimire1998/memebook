import { useState, useEffect, useContext } from "react";
import { HomePageContext } from "../../context/HomePageContext";

import MemeContainer from "./MemeContainer";

export default function HomePageView({
  allUploadedMemes,
  getAllUploadedMemes,
  deleteMeme,
  handleDelete,
}) {
  return (
    <div className="container">
      <MemeContainer
        allUploadedMemes={allUploadedMemes}
        getAllUploadedMemes={getAllUploadedMemes}
        deleteMeme={deleteMeme}
        handleDelete={handleDelete}
      />
    </div>
  );
}
