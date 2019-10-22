import React from 'react'
import "./index.scss";
export default function MsgRenderPanel(props){
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
                                <ul>
                                    <li>
                                        <div className="message-item text-left">
                                            <img src={require("../../assets/imgs/logo192.png")} alt="" className="message-item-avatar"/>
                                            <div className="message-item-content">
                                                message-item-content-left
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="message-item text-left">
                                            <img src={require("../../assets/imgs/logo192.png")} alt="" className="message-item-avatar"/>
                                            <img src={require("../../assets/imgs/logo192.png")} alt="" className="message-item-img"/>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="message-item text-right message-item_self">
                                            <img src={require("../../assets/imgs/logo192.png")} alt="" className="message-item-avatar"/>
                                            <div className="message-item-content message-item-content_self">
                                                message-item-content-right
                                            </div>
                                        </div>
                                    </li>
                                     <li>
                                        <div className="message-item text-center message-item">
                                            <p className="system-message">
                                                <span>system-message</span>
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="message-item text-left">
                                            <img src={require("../../assets/imgs/logo192.png")} alt="" className="message-item-avatar"/>
                                            <div className="message-item-content">
                                                message-item-content-left
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </main>
                </section>
            </section>
        </section>
    )
}