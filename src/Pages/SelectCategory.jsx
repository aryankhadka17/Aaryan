import { collection, onSnapshot, query } from "@firebase/firestore";
import React, { useEffect, useState, useContext } from "react";
import { SelectedContext } from "../Context/Context";
import firebaseDb from "../FirebaseConfig";
import { useNavigate } from "react-router-dom";

const SelectCategory = () => {
  const [categoryData, setCategoryData] = useState([]);

  const [selectedData, setSelectedData] = useContext(SelectedContext);

  const navigate = useNavigate()

  useEffect(() => {
    const q = query(collection(firebaseDb, "categoryTitle"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const title = [];
      querySnapshot.forEach((doc) => {
        title.push(doc.data());
      });
      setCategoryData(title);
    });
  }, []);

  const selectHandler = (e, value) => {
    if (selectedData.find((item) => item == value)) {
      let filterData = selectedData.filter((item) => item !== value);
      setSelectedData(filterData);
    } else {
      setSelectedData([...selectedData, value]);
    }
  };

  console.log("selected Data are : ", selectedData);

  const checkHandler = () => {
    navigate('/your-feed')
  }

  return (
    <div className="selected-main">
      <div className="container">
        <div className="row">
          {categoryData.map((get, keys) => {
            return (
              <div className="col-md-4">
                <div className="input-data">
                  <input
                    id={keys}
                    value={get?.title}
                    onChange={(e) => selectHandler(e, e.target.value)}
                    type="checkbox"
                  />
                  <label htmlFor={keys}>{get?.title}</label>
                </div>
              </div>
            );
          })}
        </div>
        <div className="check">
            <button onClick={checkHandler} className="btn-main">Go To Feed</button>
        </div>
      </div>
    </div>
  );
};

export default SelectCategory;
