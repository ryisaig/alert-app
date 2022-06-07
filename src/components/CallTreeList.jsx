import { IonList, IonItem, IonLabel, IonFabButton, IonFab, IonFabList, IonIcon } from '@ionic/react';
import { useEffect, useState } from 'react';
import { getAlerts, getInstructionalCallTreeList, getPendingCallTreeList, getRespondedCallTreeList } from '../actions/CallTreeAction';
import './DefaultStyle.css';
import SockJsClient from 'react-stomp';
import { HOST } from '../URL';
import { alert } from 'ionicons/icons';

const CallTreeList = ({ type }) => {
  
  const [callTree, setCallTree] = useState([]);

  const SOCKET_URL = HOST + '/ws-message';
  
  const onMessageReceived = (msg) => {
    if(msg === "alert"){
      alert("An update to your report has been made.")
    } else {
      alert("A recent " + msg + " call tree has been triggered.");
    }
      if(msg === "informational"){
        getInstructionalCallTreeList((data) => setCallTree(data));
        window.location.href = "/call-tree/informational";
      } else {
        window.location.href = "/call-tree/alerts";
      }
    }

  
  useEffect(() => {
    if(type === "pending") {
      getPendingCallTreeList((data) => setCallTree(data));
    } else if(type === "responded") {
      getRespondedCallTreeList((data) => setCallTree(data));
    } else if(type === "alerts") {
      getAlerts((data) => setCallTree(data));
    }else {
      getInstructionalCallTreeList((data) => setCallTree(data));
    }
  }, []);
  

  return (
    <div className="container">
      <IonList>
        {
          callTree.map((callTree) => {
            let urlToRedirect = undefined;
            if(type === "pending")
             urlToRedirect = "/call-tree/pending/"+ callTree.id + "/details";
            else if(type === "informational")
             urlToRedirect = "/call-tree/informational/" + callTree.id + "/details";
             else if(type=== "alerts")
             urlToRedirect = "/call-tree/alerts/" + callTree.id + "/details";
            return (
              <IonItem href={urlToRedirect}>
                <IonLabel>{callTree.subject}<br/><p style={{fontSize: "12px", fontStyle: "italic"}}>{callTree.caption}</p></IonLabel>
                <span>{callTree.createdDate}</span>
              </IonItem>
            );
          })
        }
        
         <SockJsClient
          url={SOCKET_URL}
          topics={['/topic/message']}
          onMessage={(msg)=> onMessageReceived("")}
          debug={false}
        />
        <SockJsClient
          url={SOCKET_URL}
          topics={['/topic/informational']}
          onMessage={(msg)=> onMessageReceived("informational")}
          debug={false}
        />
         <SockJsClient
          url={SOCKET_URL}
          topics={['/topic/alert-update']}
          onMessage={(msg)=> onMessageReceived("alert")}
          debug={false}
        />
      </IonList>
    </div>
  );
};

export default CallTreeList;
