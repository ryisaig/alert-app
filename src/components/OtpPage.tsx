import { IonItem,IonCardContent, IonCard, IonCardHeader, IonButton, IonCardTitle, IonInput, IonCardSubtitle, IonLabel } from '@ionic/react';
import { useEffect, useState } from 'react';
import { generateOtp, getUser, validateOtp } from '../actions/RegistrationAction';
import './DefaultStyle.css';

const OtpPage: React.FC<any> = (props) => {
  sessionStorage.setItem("referenceKey", props.match.params.referenceKey);
  const [time, setTimeValue] = useState(60);
  const [otpInput, setOtpInput] = useState("");
  
  useEffect(() => {
    if(time > 0){
      setTimeout(() => {
        setTimeValue(time - 1);
      }, 1000);  
    } 
  }, [time]);

  const otpValidationCallback = (result: any) => {
    if(result){
      getUser(sessionStorage.getItem("user"), userRetrievalCallback);
    } else {
      alert("Invalid OTP");
    }
  }

  const userRetrievalCallback = (userData:any) => {
    if(userData){
      sessionStorage.setItem("userDetails", userData);
      sessionStorage.setItem("userName", userData.name);
      window.location.href = "/call-tree";
    } else {
      window.location.href = "/user-registration/new";
    }
  }

  const otpGenerationCallback = (otpReferenceKey:any) => {
    window.location.href = "/user-registration/otp/" + otpReferenceKey;
  }

  return (
    <div className="container">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle style={{textAlign: "center"}}>Enter OTP</IonCardTitle>
          <br />
          <IonCardSubtitle style={{fontWeight: "bold"}}>Please check the SMS sent to your mobile number. <br /></IonCardSubtitle><br/>
          <IonLabel>You can resend OTP after <b>{time}</b> seconds</IonLabel>
        </IonCardHeader>
        <IonCardContent>
          <IonItem style={{borderStyle: "solid", borderWidth: "thin", borderColor: "#E0E0E0"}}>
            <IonInput placeholder="XXXXXX" type='text' maxlength={6} value={otpInput} onIonChange={(e:any)=> setOtpInput(e.detail.value)}></IonInput >
          </IonItem>
          <br />
          <IonButton disabled={time === 0} style={{width: "100%", height: "50px"}} onClick={() => validateOtp(props.match.params.referenceKey, otpInput, otpValidationCallback)}>Next</IonButton>
          <IonButton disabled={time > 0} style={{width: "100%", height: "50px"}} onClick={() => generateOtp(sessionStorage.getItem("user"), otpGenerationCallback)}>Resend OTP</IonButton>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default OtpPage;
