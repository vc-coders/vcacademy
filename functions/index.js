const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createCounsellorUsers = ((counsellorUsersData) => {
//   return admin.firestore().collection('notifications')
//     .add(notification)
//     .then(doc => console.log('notification added', doc));
    return admin.auth().createUser({
        uid: counsellorUsersData.userId,
        email: counsellorUsersData.userEmail,
        emailVerified: true,
        password: counsellorUsersData.userPassword,
        displayName: counsellorUsersData.userName,
        disabled: false
      })
        .then(function(userRecord) {
          console.log("Successfully created new user:", userRecord.uid );
        })
        .catch(function(err) {
          admin.firestore().collection('counsellorUsers').doc(counsellorUsersData.userId).delete().then(doc => console.log('Doc Deleted', doc));
        })
});


exports.creatingCounsellorUsers = functions.firestore
  .document('counsellorUsers/{counsellorUsersId}')
  .onCreate(doc => {

    const counsellorUsers = doc.data();

    return createCounsellorUsers({
      userId: doc.id,
      userName: counsellorUsers.userName,
      userEmail: counsellorUsers.userEmail,
      userPassword: counsellorUsers.userPassword
    });

});
exports.detectCounsellorUsers = functions.firestore
  .document('counsellorUsers/{counsellorUsersId}')
  .onDelete(doc => {
    console.log('detected',doc.id);
    return true;
  });

// exports.userJoined = functions.auth.user()
//   .onCreate(user => {
    
//     return admin.firestore().collection('users')
//       .doc(user.uid).get().then(doc => {

//         const newUser = doc.data();
//         const notification = {
//           content: 'Joined the party',
//           user: `${newUser.firstName} ${newUser.lastName}`,
//           time: admin.firestore.FieldValue.serverTimestamp()
//         };

//         return createNotification(notification);

//       });
// });