import React, { useState } from "react";
import PropTypes from "prop-types";
import "./index.scss";
function ScrollViewLoader(props) {
  const { minHeight, children, ...restProps } = props;
  const [topLoading, setTopLoading] = useState(false);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [stopTopLoading, setStopTopLoading] = useState(false);
  const [stopBottomLoading, setStopBottomLoading] = useState(false);
  function listenScrollEvent() {
    // 向上滚动的回调事件
    const topScroll = stopTopLoadingEvent => {
      setTopLoading(false);
      if (stopTopLoadingEvent) setStopTopLoading(true);
    };
    // 向下滚动的回调事件
    const bottomScroll = stopBottomLoading => {
      setBottomLoading(false);
      if (stopBottomLoading) setStopBottomLoading(true);
    };
    setTimeout(function() {
      const scrollContainer = document.getElementById(
        "scrollViewLoader-wrapper"
      );
      scrollContainer.onscroll = function() {
        // 滚动高度是负值，并且还没加载完数据 -> 执行向上滚动事件
        if (scrollContainer.scrollTop <= 0
           && !stopTopLoading
           ) {
          // if (topLoading) return;
          setTopLoading(true);
          props.onScrollUp && props.onScrollUp(topScroll);
        }
        // 容器的高度 + 滚动高度 + 阈值 > 内容的高度，并且还没加载完数据 -> 执行向下滚动事件
        if (
          (scrollContainer.offsetHeight + scrollContainer.scrollTop + 1 >=
            scrollContainer.scrollHeight) 
            && !stopBottomLoading
        ) {
          // if (props.bottomLoading) return;
          setBottomLoading(true);
          scrollContainer.scrollTop += 40;
          props.onScrollDown && props.onScrollDown(bottomScroll);
        }
      };
    }, 50);
  }
  // 监听滚动事件
  listenScrollEvent();
  return (
    <section
      id="scrollViewLoader-wrapper"
      className="scrollViewLoader-container"
      {...restProps}
    >
      {topLoading ? (
        <div className="loading">
          <div className="loader"></div>
        </div>
      ) : null}
      <div
        className="scrollViewLoader-list-conainer"
        style={{minHeight: `${minHeight + 30}px`}}
      >
        {children}
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
  minHeight: 900,
  // bottomLoading: false
};
ScrollViewLoader.propTypes = {
  minHeight: PropTypes.number,
  // bottomLoading: PropTypes.bool
};
export default ScrollViewLoader;
