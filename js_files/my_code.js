// Check local storage for parameters or get from URL
// This is to deal with the redirect
if (localStorage.conversationId){
} else{
  const urlParams = new URLSearchParams(window.location.search); 
  localStorage.setItem('conversationId', urlParams.get('conv'));
  localStorage.setItem('participantId', urlParams.get('part'));
  localStorage.setItem('DTMFdigits', urlParams.get('digits'));
  console.log("Conv: ", localStorage.getItem('conversationId'), "Part: ", localStorage.getItem('participantId'), "Digits: ", localStorage.getItem('DTMFdigits'));
}

// Obtain a reference to the platformClient object
const platformClient = require('platformClient');

// Sets the environment to Dublin

const client = platformClient.ApiClient.instance;
client.setEnvironment("mypurecloud.ie");

// Keep using the same token
client.setPersistSettings(true);


// Authenticate then update the presence on the page
client.loginImplicitGrant("10b85dde-54ad-4bb1-b0b0-e80c29b39e4e", "https://baigsyboy.github.io/GenCloud-SendDTMF/", { state: "TEST" })
  .then(() => {
    console.log('Logged-In');
    sendDTMF;
  })
  .catch((err) => {
    // Handle failure response
    console.log(err);
  });

function sendDTMF(){
  let apiInstance = new platformClient.ConversationsApi();

  const StrConversationId = localStorage.getItem('conversationId');
  const StrParticipantId = localStorage.getItem('participantId');
  const StrDigits = localStorage.getItem('DTMFdigits');
  const digitsToSend = "\"" + StrDigits + "\""
  localStorage.clear();
  
  let opts = { 
    'body': {"digits": digitsToSend} // Object | Digits
  };
  
  apiInstance.postConversationParticipantDigits(StrConversationId, StrParticipantId, opts)
    .then(() => {
      console.log('postConversationParticipantDigits returned successfully.');
    })
    .catch((err) => {
      console.log('There was a failure calling postConversationParticipantDigits');
      console.error(err);
    });

}