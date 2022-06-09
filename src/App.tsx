import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonRadio,
  IonRouterOutlet,
  IonSelect,
  IonSelectOption,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonText,
  IonTitle,
  IonToolbar,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { alertCircleOutline, checkbox, checkboxOutline, close, exitOutline, informationCircleOutline, logOut, personCircleOutline, triangle, warningOutline, warningSharp} from 'ionicons/icons';
import { IonFabButton, IonFab, IonFabList, IonIcon } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import { Storage } from '@ionic/storage';

/* Theme variables */
import './theme/variables.css';
import CallTreeList from './components/CallTreeList';
import CallTreeDetails from './components/CallTreeDetails';
import DefaultPage from './components/DefaultPage';
import OtpPage from './components/OtpPage';
import UserRegistration from './components/UserRegistration';
import InformationalDetails from './components/InformationalDetails';
import Admin from './components/Admin';
import AdminResponses from './components/AdminResponses';
import { useState } from 'react';
import axios from 'axios';
import { HOST } from './URL';
import AlertDetails from './components/AlertDetails';
import Tips from './components/Tips';


setupIonicReact();

const store = new Storage();
store.create();

const App: React.FC = () => {
  let [alert, setAlert] = useState({
    reportType: "",
    subject: "",
    description: "",
    humanDamage: false,
    location: "",
    fullName: {},
    mobileNumber: {}

  });
  
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  const [userDetails, setUserDetails] = useState({
    mobileNumber: sessionStorage.getItem("user"),
    fullName: sessionStorage.getItem("userName"),
    address: sessionStorage.getItem("address")
  });

  const URL = HOST;

  const submitReport = () => {
    axios.post(URL + "/alert", {
      ...alert,
      geolocationX: sessionStorage.getItem("geoLocationX"),
      geolocationY: sessionStorage.getItem("geoLocationY"),
      fullName: sessionStorage.getItem("userName"), 
      mobileNumber: sessionStorage.getItem("user")
    })
    .then(() => {
      window.alert("Your request has been submitted");
      setAlert({reportType: "",
      subject: "",
      description: "",
      humanDamage: false,
      location: "",
      fullName: "",
      mobileNumber: ""});
      setIsAlertOpen(false);
    })
  }

  const logOut = () => {
    sessionStorage.removeItem("userDetails");
    sessionStorage.removeItem("userName");
    window.location.href = "../../";
  }


  return (
  <IonApp>
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
         {    
         sessionStorage.getItem("userDetails") && <IonButtons slot="start">
            <IonButton onClick={()=>{setIsAccountModalOpen(true)}}>
              <IonIcon icon={personCircleOutline} style={{fontSize: "32px"}} />
            </IonButton>
          </IonButtons>
        }
          <IonTitle style={{textAlign: "center"}} >
          ALERTagaytay
          </IonTitle>
          
          {/* <img src="./logo.png" style={{height: "40px", margin: "auto", display: "block"}}/> */}
          {sessionStorage.getItem("userDetails") &&  <IonButtons slot="end">
            <IonButton onClick={() => logOut()}>
              <IonIcon icon={exitOutline} style={{fontSize: "32px"}} />
            </IonButton>
          </IonButtons>
  }
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/call-tree">
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/call-tree/pending">
                  <CallTreeList type="pending"/>
                </Route>
                <Route exact path="/call-tree/alerts">
                  <CallTreeList type="alerts"/>
                </Route>
                <Route exact path="/call-tree/responded">
                  <CallTreeList type="responded" />
                </Route>
                <Route exact path="/call-tree/tips/:id/details" render={(props) => 
                  <Tips {...props}/>
                }/>
                <Route exact path="/call-tree/pending/:id/details" render={(props) => 
                    <CallTreeDetails {...props}/>
                }/>
                <Route exact path="/call-tree/alerts/:id/details" render={(props) => 
                    <AlertDetails {...props}/>
                }/>
                <Route exact path="/call-tree/informational">
                  <CallTreeList type="informational" />
                </Route>
                <Route exact path="/call-tree/tips">
                  <CallTreeList type="tips" />
                </Route>
                <Route exact path="/call-tree/informational/:id/details" render={(props) => 
                  <InformationalDetails {...props}/>
                }/>
                <Route exact path="/call-tree">
                  <Redirect to="/call-tree/pending" />
                </Route>
              </IonRouterOutlet>
              <IonTabBar slot="top">
                {/* <IonTabButton tab="PendingCallTree" href="/call-tree/pending">
                  <IonIcon icon={checkboxOutline} />
                  <IonLabel>Pending</IonLabel>
                </IonTabButton>
                <IonTabButton tab="RespondedCallTree" href="/call-tree/responded">
                  <IonIcon icon={checkbox} />
                  <IonLabel>Responded</IonLabel>
                </IonTabButton> */}
                <IonTabButton tab="Informational" href="/call-tree/informational">
                  <IonIcon icon={alertCircleOutline} />
                  <IonLabel>My Alerts</IonLabel>
                </IonTabButton>
                <IonTabButton tab="Alerts" href="/call-tree/alerts">
                  <IonIcon icon={warningOutline} />
                  <IonLabel>My Reports</IonLabel>
                </IonTabButton>
                <IonTabButton tab="Tips" href="/call-tree/tips">
                  <IonIcon icon={informationCircleOutline} />
                  <IonLabel>Tips</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
          <Route exact path="/admin/responses">
            <AdminResponses />
          </Route>
          <Route exact path="/user-registration/new">
            <UserRegistration/>
          </Route>
          <Route exact path="/user-registration/otp/:referenceKey" render={(props) => 
              <OtpPage {...props}/>
          }/>
          <Route exact path="/user-registration">
            <DefaultPage />
          </Route>
          <Route exact path="/">
            <DefaultPage/>
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
      <IonFab vertical="bottom" horizontal="end" edge slot="fixed" style={{marginBottom: "50px"}} onClick={()=>setIsAlertOpen(true)}>
                <IonFabButton color="danger" style={{width: "75px", height: "75px"}}>
                    <IonIcon icon={warningSharp} />
                </IonFabButton>
                </IonFab>
      </IonContent>
      <IonModal isOpen={isAlertOpen} onDidDismiss={() => setIsAlertOpen(false)}>
      <IonHeader>
        <IonToolbar color="primary">
        <IonTitle style={{textAlign: "center"}}>
          ALERTagaytay
          </IonTitle>
                    <IonButton slot="end" onClick={() => setIsAlertOpen(false)}><IonIcon icon={close}/></IonButton>
        </IonToolbar>
      </IonHeader>
          <IonCard>
            <IonCardHeader>
            <IonCardTitle>Report an Emergency</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
            <IonItem>
            <IonLabel>Report Type</IonLabel>
            <IonSelect value={alert.reportType} placeholder="Select One" onIonChange={e => setAlert({...alert, reportType: e.detail.value})}>
              <IonSelectOption value="First Aid">First Aid</IonSelectOption>
              <IonSelectOption value="Traffic Accident">Traffic Accident</IonSelectOption>
              <IonSelectOption value="Domestic Accident">Domestic Accident</IonSelectOption>
              <IonSelectOption value="Natural Disaster">Natural Disaster</IonSelectOption>
              <IonSelectOption value="Terrorist Attack">Terrorist Attack</IonSelectOption>
              <IonSelectOption value="Others">Others</IonSelectOption>
            </IonSelect>
          </IonItem>
            <IonItem>
              <IonLabel>Is there a human damage?</IonLabel>
              <IonCheckbox slot="end" checked={alert.humanDamage} onIonChange={(e)=>{setAlert({...alert, humanDamage: e.detail.checked})}}/>
            </IonItem>
            <IonItem>
              <IonLabel>Full Name</IonLabel>
              <IonText slot="end" style={{textAlign: "right"}}>{sessionStorage.getItem("userName")}</IonText>
              </IonItem>
              <IonItem>
              <IonLabel>Mobile Number</IonLabel>
              <IonText slot="end" style={{textAlign: "right"}}>{sessionStorage.getItem("user")}</IonText>
              </IonItem>
              <IonItem>
                <IonLabel>Subject</IonLabel>
                <IonInput slot="end" value={alert.subject}  placeholder="Type the subject here..." onIonChange={(e)=>{setAlert({...alert, subject: e.detail.value ? e.detail.value : ""})}}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel>Description</IonLabel>
                <IonInput slot="end"  value={alert.description}  placeholder="Type the description here..." onIonChange={(e)=>{setAlert({...alert, description: e.detail.value ? e.detail.value : ""})}}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel>Location Hint</IonLabel>
                <IonInput slot="end"  value={alert.location} placeholder="Type any landmarks..." onIonChange={(e)=>{setAlert({...alert, location: e.detail.value ? e.detail.value : ""})}}></IonInput>
              </IonItem>
              <br/>
              <IonButton style={{float: "right"}} onClick={() => submitReport()}>Submit</IonButton>
              <br/>
              <br/>
            </IonCardContent>
          </IonCard>
      </IonModal>

      <IonModal isOpen={isAccountModalOpen} onDidDismiss={() => setIsAccountModalOpen(false)}>
      <IonHeader>
        <IonToolbar color="primary">
        <IonTitle style={{textAlign: "center"}}>
          ALERTagaytay
          </IonTitle>
                    <IonButton slot="end" onClick={() => setIsAccountModalOpen(false)}><IonIcon icon={close}/></IonButton>
        </IonToolbar>
      </IonHeader>
          <IonCard>
            <IonCardHeader>
            <IonCardTitle>Modify Account</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel>Mobile Number</IonLabel>
                <IonInput slot="end" value={userDetails.mobileNumber} onIonChange={(e)=>{setUserDetails({...userDetails, mobileNumber: e.detail.value ? e.detail.value : ""})}}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel>Full Name</IonLabel>
                <IonInput slot="end" value={userDetails.fullName} onIonChange={(e)=>{setUserDetails({...userDetails, fullName: e.detail.value ? e.detail.value : ""})}}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel>Address</IonLabel>
                <IonInput slot="end" value={userDetails.address} onIonChange={(e)=>{setUserDetails({...userDetails, address: e.detail.value ? e.detail.value : ""})}}></IonInput>
              </IonItem>
              <br/>
              <IonButton style={{float: "right"}} onClick={() => submitReport()}>Update</IonButton>
              <br/>
              <br/>
            </IonCardContent>
          </IonCard>
      </IonModal>
    </IonPage>
  </IonApp>
  )
}

export default App;
