import { IonList, IonItem, IonLabel, IonDatetime, IonIcon, IonCardContent, IonCard, IonCardHeader, IonRadio, IonRadioGroup, IonButton, IonTextarea, IonTitle, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { arrowBack, chevronBack, thumbsDown, thumbsUp, warning } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { getAlertDetails, getCallTreeDetails, saveCallTreeResponse } from '../actions/CallTreeAction';
import './DefaultStyle.css';

const AlertDetails: React.FC<any> = (props:any) => {
  
  const [callTree, setCallTree] : any = useState([]);
  const [response, setResponse] : any = useState(null);
  const [details, setDetails] : any = useState('');

  const callTreeId = props.match.params.id;

  useEffect(() => {
    getAlertDetails(callTreeId, (data: any) => {setCallTree(data)});
  }, []);

  return (
    <div className="container">
      <IonCard>
        <IonCardHeader>
          <IonButton href="/call-tree/alerts" color="light" style={{width: "100%"}}>
            <IonIcon slot="start" icon={chevronBack} />
            Back
          </IonButton>
          <IonCardSubtitle>{callTree.createdDate}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonList style={{borderStyle: "solid", borderWidth: "thin", borderColor: "#E0E0E0", padding: "0"}}>
            <IonItem>Report Type: {callTree.reportType}</IonItem>
            <IonItem>Classification: {callTree.subject}</IonItem>
            <IonItem>Location Hint: {callTree.location}</IonItem>
            <IonItem>Status: {callTree.status}</IonItem>

          </IonList>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default AlertDetails;
