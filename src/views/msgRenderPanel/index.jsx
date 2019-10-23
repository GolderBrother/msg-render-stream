import React, {useState, useEffect} from "react";
import ScrollViewLoader from "../../components/ScrollViewLoader";
import "./index.scss";
const MAX_COUNT = 5;
const TYPES = {
  TEXT: "text",
  SYSTEM: "system",
  IMG: "img"
}
const OWNER_ID = 3;
const DEFAULT_HEIGHT = 900;
const MESSAGE_LIST = [
  {
    id: 1,
    userId: 1,
    type: TYPES.TEXT,
    avatarUrl: require("../../assets/imgs/logo192.png"),
    content: "message-item-content-left"
  },
  {
    id: 2,
    userId: 2,
    type: TYPES.IMG,
    avatarUrl: require("../../assets/imgs/logo192.png"),
    imgUrl: require("../../assets/imgs/logo192.png")
  },
  {
    id: 3,
    userId: 3,
    type: TYPES.TEXT,
    avatarUrl: require("../../assets/imgs/logo192.png"),
    content: "message-item-content-right"
  },
  {
    id: 4,
    type: TYPES.SYSTEM,
    content: "system-message"
  },
  {
    id: 5,
    userId: 5,
    type: TYPES.TEXT,
    avatarUrl: require("../../assets/imgs/logo192.png"),
    content: "message-item-content-left"
  }
];
export default function MsgRenderPanel(props) {
  const [messageList, setMessageList] = useState(MESSAGE_LIST);
  let [upCount, setUpCount] = useState(0);
  let [downCount, setDownCount] = useState(0);  
  let [upId, setUpId] = useState(0);  
  let [downId, setDownId] = useState(10);
  const [minHeight, setMinHeight] = useState(DEFAULT_HEIGHT);
  const [maxHeight, setMaxHeight] = useState(DEFAULT_HEIGHT);

  const [isPullRefreshLoading, setIsPullRefreshLoading] = useState(false);
  const [isPullRefreshAll, setIsPullRefreshAll] = useState(false);
  let [isReachBottomLoading, setIsReachBottomLoading] = useState(false);
  const [isReachBottomAll, setIsReachBottomAll] = useState(false);

  const msgRenderPanelRef = React.createRef();
  function getClassName({ type = "", userId = "" }) {
    if (type === TYPES.SYSTEM) return "message-item_center";
    if (userId === OWNER_ID) return "message-item_right message-item_self";
    else return "message-item_left";
  }
  // 下拉刷新(向上滚动)获取数据
  function getMsgByPullRefresh(){
    return new Promise(resolve => {
      setUpId(--upId);    
      setUpCount(++upCount);
      setTimeout(function(){
        if(upCount > MAX_COUNT) return resolve([])
        let msgList = [{
          id: upId-1,
          userId: 0,
          type: TYPES.SYSTEM,
          content: `第 ${upCount} 次向上滚动！`
        },
        {
          id: upId-2,
          userId: 1,
          type: TYPES.IMG,
          avatarUrl: require("../../assets/imgs/logo192.png"),
          imgUrl: require("../../assets/imgs/logo192.png")
        },
        {
          id: upId-3,
          userId: 5,
          type: TYPES.TEXT,
          avatarUrl: require("../../assets/imgs/logo192.png"),
          content: `message-item-content-left_${20-upCount}`,
        }];
        resolve(msgList)
      }, 1000);
    })
  }
  // 下拉刷新
  async function handlePullRefresh(complete){
    if(isPullRefreshLoading) return;
    if(isPullRefreshAll) {
      complete(true); 
      setIsPullRefreshLoading(false);
      return
    }
    try {
      const data = await getMsgByPullRefresh();
      if(!data) return;
      if(data.length === 0) {
        setIsPullRefreshAll(true);
        complete(true)
      }else {
        let msgList = [...(data.reverse()), ...messageList]
        setMessageList(msgList)
      }
    } catch (error) {
      console.error(`handlePullRefresh error: ${error}`)
    }
    setIsPullRefreshLoading(false);
  }
  // 下拉加载获取数据
  function getMsgByReachBottom(){
    return new Promise(resolve => {
      setTimeout(function(){
        if(downCount > MAX_COUNT) return resolve([])
        let msgList = [{
          id: downId-3,
          userId: 0,
          type: TYPES.SYSTEM,
          content: `第 ${downCount} 次向下滚动！`
        },
        {
          id: downId-2,
          userId: 1,
          type: TYPES.IMG,
          avatarUrl: require("../../assets/imgs/logo192.png"),
          imgUrl: require("../../assets/imgs/logo192.png")
        },
        {
          id: downId-1,
          userId: 5,
          type: TYPES.TEXT,
          avatarUrl: require("../../assets/imgs/logo192.png"),
          content: `加载第 ${downCount} 条新信息！`,
        }];
        resolve(msgList)
        setDownId(--downId);    
        setDownCount(++downCount);
      }, 1000)
    })
  }
  // 上拉加载
  async function handleReachBottom(complete){
    setTimeout(async () => {
      if(isReachBottomLoading) return
      if(isReachBottomAll) {
        complete(true);
        setIsReachBottomLoading(false);
        return;
      }
      try {
        const data = await getMsgByReachBottom();
        if(!data) return;
        if(data.length === 0) {
          setIsReachBottomAll(true);
          complete(true)
        }else {
          const msgList = [...messageList, ...data];
          setMessageList(msgList);
        }
        setIsReachBottomLoading(false);
      } catch (error) {
        console.error(`handlePullRefresh error: ${error}`)
      }
    }, 0)
  }
  function init(){
    let _minHeight = msgRenderPanelRef.current ? msgRenderPanelRef.current.offsetHeight : DEFAULT_HEIGHT;
    let _maxHeight = msgRenderPanelRef.current ? msgRenderPanelRef.current.scrollHeight : DEFAULT_HEIGHT;
    setMinHeight(_minHeight);
    setMaxHeight(_maxHeight);
  }
  useEffect(() => {
    init();
  }, []);
  return (
    <section className="msgRenderPanel">
      <section className="msgRenderPanel-wrapper">
        <section className="msgRenderPanel-container" ref={msgRenderPanelRef}>
          <header className="msgRenderPanel-title">
            <h3 className="msgRenderPanel-text">MsgRenderPanel</h3>
          </header>
          <main className="msgRenderPanel-content">
            <div className="msgRenderPanel-message" style={{minHeight: `${minHeight-50}px`, maxHeight: `${maxHeight-50}px`}}>
              <div className="msgRenderPanel-message-list">
                {messageList && messageList.length ? (
                    <ScrollViewLoader minHeight={minHeight} onScrollUp={handlePullRefresh} onScrollDown={handleReachBottom}
                      bottomLoading={isReachBottomLoading}
                    >
                      <ul>
                        {messageList.map((item, index) => (
                        <li key={index} className={`message-item ${getClassName(item)}`}>
                          <img
                            src={item.avatarUrl}
                            alt=""
                            className="message-item-avatar"
                          />
                          {item.type === TYPES.SYSTEM ? (
                            <p className="system-message">
                              <span> {item.content}</span>
                            </p>
                          ) : item.type === TYPES.TEXT ? (
                            <div className="message-item-content">
                              {item.content}
                            </div>
                          ) : item.type === TYPES.IMG ? (
                            <img
                              src={item.imgUrl}
                              alt=""
                              className="message-item-img"
                            />
                          ) : null}
                        </li> 
                      ))}
                      </ul>
                    </ScrollViewLoader>
                ) : (
                  <div className="no-message-container text-center">
                    <span>未找到消息记录~</span>
                  </div>
                )}
              </div>
            </div>
          </main>
        </section>
      </section>
    </section>
  );
}

