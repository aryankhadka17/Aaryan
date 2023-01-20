import { collection, onSnapshot, query } from "@firebase/firestore";
import React, { useRef, useEffect, useState, useContext } from "react";
import { SelectedContext } from "../Context/Context";
import firebaseDb from "../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { intersectionWith } from "lodash";
import js from "../Assests/js.png";
import web from "../Assests/web.jpg";
import { useInViewport } from "react-in-viewport";

const DetailCategory = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [selectedData, setSelectedData] = useContext(SelectedContext);

  useEffect(() => {
    const q = query(collection(firebaseDb, "categoryTitleData"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const title = [];
      querySnapshot.forEach((doc) => {
        title.push(doc.data());
      });
      setCategoryData(title);
    });
  }, []);

  const [recom , setRecom] = useState([])
  useEffect(() => {
    const q = query(collection(firebaseDb, "recommendation"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const title = [];
      querySnapshot.forEach((doc) => {
        title.push(doc.data());
      });
      setRecom(title);
    });
  }, []);

  const [tempData , setTempData] = useState([])
  const [check , setCheck] = useState(false)
  const selectedHandler = (e, title) => {
    e.preventDefault();
    console.log("title : ",title);
    let temp = categoryData.filter(item => item.category === title)
    setTempData(temp);
    setCheck(true)
  }

  const initialFilter = categoryData?.filter((object) =>selectedData?.includes(object.category));
  console.log("initial",initialFilter);
  console.log("temp data : ",tempData)

  const [filteredObjects,SetFilteredObjects] = useState([]);
  useEffect(()=>{
    if(tempData.length > 0){
      SetFilteredObjects(tempData)
    }
  },[tempData])

  console.log("filterdata", filteredObjects);



  return (
    <div className="feed-main">
      <div className="container">
        <p> Your Feed</p>
        <div className="feed-overflow">
          <div className="row">
            <div className="col-md-9">
              {check ? filteredObjects.map((get, keys) => {
                return (
                  <div className="feed-container">
                    <div>
                      <div className="feed-card">
                        <div className="feed-card-img">
                          <video
                            controls
                            className="video-content"
                          >
                            <source
                              src={get?.author_content}
                              type="video/mp4"
                            />
                          </video>
                        </div>
                        <div className="feed-author">
                          <img src={get?.author_image} alt="" />
                          <label htmlFor=""> {get?.author_name} </label>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }) : initialFilter.map((get, keys) => {
                return (
                  <div className="feed-container">
                    <div>
                      <div className="feed-card">
                        <div className="feed-card-img">
                          <video
                            controls
                            className="video-content"
                          >
                            <source
                              src={get?.author_content}
                              type="video/mp4"
                            />
                          </video>
                        </div>
                        <div className="feed-author">
                          <img src={get?.author_image} alt="" />
                          <label htmlFor=""> {get?.author_name} </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}) }
            </div>

            <div className="col-md-3">
              <div className="recom-main">
                <h3>Recommendations</h3>
                {recom?.map((get,keys) => {
                  return(
                <div className="recommendation">
                  <div className="check">
                    <button onClick={(e) => selectedHandler(e,get?.title)} className="btn-main1">{get?.title}</button>
                  </div>
                </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCategory;
