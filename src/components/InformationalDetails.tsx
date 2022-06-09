import { IonList, IonItem, IonLabel, IonDatetime, IonIcon, IonCardContent, IonCard, IonCardHeader, IonRadio, IonRadioGroup, IonButton, IonTextarea, IonTitle, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { arrowBack, chevronBack, thumbsDown, thumbsUp, warning } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { getCallTreeDetails, getInformationalDetails, saveCallTreeResponse } from '../actions/CallTreeAction';
import './DefaultStyle.css';

const InformationalDetails: React.FC<any> = (props:any) => {
  
  const [callTree, setCallTree] : any = useState([]);

  const callTreeId = props.match.params.id;

  useEffect(() => {
    getInformationalDetails(callTreeId, (data: any) => {setCallTree(data)});
  }, []);

  return (
    <div className="container">
      <IonCard>
        <IonCardHeader>
          <IonButton href="/call-tree/Informational" color="light" style={{width: "100%"}}>
            <IonIcon slot="start" icon={chevronBack} />
            Back
          </IonButton>
        
        </IonCardHeader>
        <IonCardContent>
          <div style={{borderStyle: "solid", borderWidth: "thin", borderColor: "#E0E0E0", padding: "20px"}}>
            <h1>{callTree.subject}</h1><br/>
          <div dangerouslySetInnerHTML={{ __html: callTree.content }} />
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default InformationalDetails;
