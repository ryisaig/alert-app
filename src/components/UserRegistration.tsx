import { IonItem,IonCardContent, IonCard, IonCardHeader, IonButton, IonCardTitle, IonInput, IonCardSubtitle, IonSelect, IonSelectOption } from '@ionic/react';
import { useState } from 'react';
import { saveUser } from '../actions/RegistrationAction';
import './DefaultStyle.css';

const UserRegistration: React.FC<any> = () => {

  const [userDetails, setUserDetails]:any = useState({}); 
  const userRegistrationCallBack = (result: any) => {
    console.log("result", result)
    sessionStorage.setItem("userDetails", result);
      sessionStorage.setItem("userName", result.name);
      sessionStorage.setItem("address", result.address);
    window.location.href = "/call-tree/informational";
  }

  return (
    <div className="container">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle style={{textAlign: "center"}}>User Registration</IonCardTitle>
          <br />
        </IonCardHeader>
        <IonCardContent>
          <IonItem style={{borderStyle: "solid", borderWidth: "thin", borderColor: "#E0E0E0"}}>
            <IonInput placeholder="Enter First name" type='text' value={userDetails.fullName} onIonChange={(e:any) => {setUserDetails({...userDetails, fullName: e.detail.value})}}></IonInput >
          </IonItem>
          <br />
          <IonItem style={{borderStyle: "solid", borderWidth: "thin", borderColor: "#E0E0E0"}}>
            <IonInput placeholder="Enter Last name" type='text' value={userDetails.lastName} onIonChange={(e:any) => {setUserDetails({...userDetails, lastName: e.detail.value})}}></IonInput >
          </IonItem>
          <br />
          {/* <IonItem style={{borderStyle: "solid", borderWidth: "thin", borderColor: "#E0E0E0"}}>
            <IonInput placeholder="Enter brgy address" type='text' value={userDetails.brgy} onIonChange={(e:any) => {setUserDetails({...userDetails, brgy: e.detail.value})}}></IonInput >
          </IonItem> */}
          <IonSelect style={{borderStyle: "solid", borderWidth: "thin", borderColor: "#E0E0E0"}} value={userDetails.brgy} placeholder="Select Brgy" onIonChange={(e:any) => {setUserDetails({...userDetails, brgy: e.detail.value})}}>
          <IonSelectOption value="Asisan">Asisan</IonSelectOption>
          <IonSelectOption value="Bagong Tubig">Bagong Tubig</IonSelectOption>
          <IonSelectOption value="Calabuso">Calabuso</IonSelectOption>
          <IonSelectOption value="Dapdap East">Dapdap East</IonSelectOption>
          <IonSelectOption value="Dapdap West">Dapdap West</IonSelectOption>
          <IonSelectOption value="Francisco">Francisco</IonSelectOption>
          <IonSelectOption value="Guinhawa North">Guinhawa North</IonSelectOption>
          <IonSelectOption value="Guinhawa South">Guinhawa South</IonSelectOption>
          <IonSelectOption value="Iruhin Central">Iruhin Central</IonSelectOption>
          <IonSelectOption value="Iruhin East">Iruhin East</IonSelectOption>
          <IonSelectOption value="Iruhin West">Iruhin West</IonSelectOption>
          <IonSelectOption value="Kaybagal Central">Kaybagal Central</IonSelectOption>
          <IonSelectOption value="Kaybagal North">Kaybagal North</IonSelectOption>
          <IonSelectOption value="Kaybagal South">Kaybagal South</IonSelectOption>
          <IonSelectOption value="Mag-asawang Ilat">Mag-asawang Ilat</IonSelectOption>
          <IonSelectOption value="Maharlika East">Maharlika East</IonSelectOption>
          <IonSelectOption value="Maharlika West">Maharlika West</IonSelectOption>
          <IonSelectOption value="Maitim II Central">Maitim II Central</IonSelectOption>
          <IonSelectOption value="Maitim II East">Maitim II East</IonSelectOption>
          <IonSelectOption value="Maitim II West">Maitim II West</IonSelectOption>
          <IonSelectOption value="Mendez Crossing East">Mendez Crossing East</IonSelectOption>
          <IonSelectOption value="Mendez Crossing West">Mendez Crossing West</IonSelectOption>
          <IonSelectOption value="Neogan">Neogan</IonSelectOption>
          <IonSelectOption value="Patutong Malaki North">Patutong Malaki North</IonSelectOption>
          <IonSelectOption value="Patutong Malaki South">Patutong Malaki South</IonSelectOption>
          <IonSelectOption value="Sambong">Sambong</IonSelectOption>
          <IonSelectOption value="San Jose">San Jose</IonSelectOption>
          <IonSelectOption value="Silang Crossing East">Silang Crossing East</IonSelectOption>
          <IonSelectOption value="Silang Crossing West">Silang Crossing West</IonSelectOption>
          <IonSelectOption value="Sungay East">Sungay East</IonSelectOption>
          <IonSelectOption value="Sungay West">Sungay West</IonSelectOption>
          <IonSelectOption value="Tolentino East">Tolentino East</IonSelectOption>
          <IonSelectOption value="Tolentino West">Tolentino West</IonSelectOption>
          <IonSelectOption value="Zambal">Zambal</IonSelectOption>
          </IonSelect>
          <br />
          <IonItem style={{borderStyle: "solid", borderWidth: "thin", borderColor: "#E0E0E0"}}>
            <IonInput placeholder="Enter residential address" type='text' value={userDetails.address} onIonChange={(e:any) => {setUserDetails({...userDetails, address: e.detail.value})}}></IonInput >
          </IonItem>
          <br />
          <IonButton style={{width: "100%", height: "50px"}} onClick={() => {saveUser(userDetails, userRegistrationCallBack)}}>Register</IonButton>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default UserRegistration;
