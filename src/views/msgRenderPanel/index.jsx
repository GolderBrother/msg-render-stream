import React from "react";
import ScrollViewLoader from "../../components/ScrollViewLoader";
import "./index.scss";
export default function MsgRenderPanel(props) {
  const listData = [
    {
      id: 1,
      userId: 1,
      type: "text",
      avatarUrl: require("../../assets/imgs/logo192.png"),
      content: "message-item-content-left"
    },
    {
      id: 2,
      userId: 2,
      type: "img",
      avatarUrl: require("../../assets/imgs/logo192.png"),
      imgUrl: require("../../assets/imgs/logo192.png")
    },
    {
      id: 3,
      userId: 3,
      type: "text",
      avatarUrl: require("../../assets/imgs/logo192.png"),
      content: "message-item-content-right"
    },
    {
      id: 4,
      type: "system",
      content: "system-message"
    },
    {
      id: 5,
      userId: 5,
      type: "text",
      avatarUrl: require("../../assets/imgs/logo192.png"),
      content: "message-item-content-left"
    }
  ];
  function getClassName({ type = "", userId = "" }) {
    if (type === "system") return "message-item_center";
    if (userId === 3) return "message-item_right message-item_self";
    else return "message-item_left";
  }
  return (
    <section className="msgRenderPanel">
      <section className="msgRenderPanel-wrapper">
        <section className="msgRenderPanel-container">
          <header className="msgRenderPanel-title">
            <h1 className="msgRenderPanel-text">MsgRenderPanel</h1>
          </header>
          <main className="msgRenderPanel-content">
            <div className="msgRenderPanel-message">
              <div className="msgRenderPanel-message-list">
                {listData && listData.length ? (
                  <ul>
                    {listData.map((item, index) => (
                      <li key={index}>
                        <div className={`message-item ${getClassName(item)}`}>
                          <img
                            src={item.avatarUrl}
                            alt=""
                            className="message-item-avatar"
                          />
                          {item.type === "system" ? (
                            <p className="system-message">
                              <span> {item.content}</span>
                            </p>
                          ) : item.type === "text" ? (
                            <div className="message-item-content">
                              {item.content}
                            </div>
                          ) : (
                            <img
                              src={item.imgUrl}
                              alt=""
                              className="message-item-img"
                            />
                          )}
                        </div>
                      </li>
                    ))}
                    {/* <li>
                      <div className="message-item message-item_left">
                        <img
                          src={require("../../assets/imgs/logo192.png")}
                          alt=""
                          className="message-item-avatar"
                        />
                        <div className="message-item-content">
                          message-item-content-left
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="message-item message-item_right">
                        <img
                          src={require("../../assets/imgs/logo192.png")}
                          alt=""
                          className="message-item-avatar"
                        />
                        <img
                          src={require("../../assets/imgs/logo192.png")}
                          alt=""
                          className="message-item-img"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="message-item message-item_right message-item_self">
                        <img
                          src={require("../../assets/imgs/logo192.png")}
                          alt=""
                          className="message-item-avatar"
                        />
                        <div className="message-item-content message-item-content_self">
                          message-item-content-right
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="message-item message-item_center">
                        <p className="system-message">
                          <span>system-message</span>
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="message-item message-item_left">
                        <img
                          src={require("../../assets/imgs/logo192.png")}
                          alt=""
                          className="message-item-avatar"
                        />
                        <div className="message-item-content">
                          message-item-content-left
                        </div>
                      </div>
                    </li> */}
                    <ScrollViewLoader />
                  </ul>
                ) : (
                  "没有任何消息了~"
                )}
              </div>
            </div>
          </main>
        </section>
      </section>
    </section>
  );
}
