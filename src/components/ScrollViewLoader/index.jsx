import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./index.scss";
function ScrollViewLoader(props) {
  const { minHeight } = props;
  const [topLoading, setTopLoading] = useState(false);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [stopTopLoading, setStopTopLoading] = useState(false);
  const [stopBottomLoading, setStopBottomLoading] = useState(false);
  function listenScrollEvent() {
    console.log("listenScrollEvent");
    const topScroll = stopTopLoadingEvent => {
      setTopLoading(false);
      if (stopTopLoadingEvent) setStopTopLoading(true);
    };
    const bottomScroll = stopBottomLoading => {
      setBottomLoading(false);
      if (stopBottomLoading) setStopBottomLoading(true);
    };
    setTimeout(function() {
      const scrollContainer = document.getElementById(
        "scrollViewLoader-wrapper"
      );
      scrollContainer.onscroll = function() {
        if (scrollContainer.scrollTop <= 0 && !stopTopLoading) {
          if (topLoading) return;
          setTopLoading(true);
          props.upscroll && props.upscroll(topScroll);
        }
        if (
          scrollContainer.offsetHeight + scrollContainer.scrollTop + 1 >=
            scrollContainer.scrollHeight &&
          !stopBottomLoading
        ) {
          if (bottomLoading) return;
          setBottomLoading(true);
          scrollContainer.scrollTop += 40;
          props.downscroll && props.downscroll(bottomScroll);
        }
      };
    }, 50);
  }
  useEffect(() => {
    listenScrollEvent();
  });
  return (
    <section
      id="scrollViewLoader-wrapper"
      className="scrollViewLoader-container"
    >
      {topLoading ? (
        <div className="loading">
          <div className="loader"></div>
        </div>
      ) : null}
      <div
        className="scrollViewLoader-list-conainer"
        style={`${minHeight + 30}px`}
      >
        {props.chidlren}
      </div>
      {bottomLoading ? (
        <div className="loading">
          <div className="loader"></div>
        </div>
      ) : null}
    </section>
  );
}
ScrollViewLoader.defaultProps = {
  minHeight: 900
};
ScrollViewLoader.propTypes = {
  minHeight: PropTypes.number
};
export default ScrollViewLoader;
