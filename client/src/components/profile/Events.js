import React from "react";
import styles from "../../styles/profileInfo.module.css";

const Events = () => {
  return (
    <div className="col-12">
      <label>Događaji</label>
      <div className="card mt-3 tab-card" style={{ border: "none" }}>
        <div
          className="card-header tab-card-header m-0 p-0"
          style={{ backgroundColor: "white" }}
        >
          <ul
            className="nav nav-tabs card-header-tabs m-0"
            id="myTab"
            role="tablist"
          >
            <li className="nav-item">
              <a
                className="nav-link active"
                id="one-tab"
                data-toggle="tab"
                href="#one"
                aria-selected="true"
              >
                Moji
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="two-tab"
                data-toggle="tab"
                href="#two"
                aria-selected="false"
              >
                Idem
              </a>
            </li>
          </ul>
        </div>
        <div className={`tab-content ${styles.eventCard}`} id="myTabContent">
          <div className="tab-pane fade show active p-3" id="one">
            <h5 className="card-title">Moji događaji</h5>
            <p className="card-text">Neki događaji</p>
          </div>
          <div className="tab-pane fade p-3" id="two">
            <h5 className="card-title">Događaji na koje idem</h5>
            <p className="card-text">Neki događaji 2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
