const firebase = require('firebase')

module.exports = {
    userSrch: async function({usId}){
        const db = firebase.firestore();
        let userdat=null;
        snapshot = await db.collection("customer").doc(usId).get()
        userdat = snapshot.data()
        return{
            ...userdat
        }
    },
    prodSrch: async function({prId}){
        const db = firebase.firestore();
        let prodat=null;
        snapshot = await db.collection("products").doc(prId).get()
        prodat = snapshot.data()
        return{
            ...prodat
        }
    }, 
    shopSrch: async function({shId}){
        const db = firebase.firestore();
        let shdat=null;
        snapshot = await db.collection("shop").doc(shId).get()
        shdat = snapshot.data()
        return{
            ...shdat
        }
    },
    updRating: async function({ratingDat}, req){
        console.log("initiated")
        const db = firebase.firestore();
        const ratSet = db.collection('products').doc(ratingDat.prId)
        snpshot = await db.collection('products').doc(ratingDat.prId).get()
        const snapshot = snpshot.data()
        snapshot.custRatings.push(ratingDat.usId)
        let ratVals = ((((snapshot.ratingVals.noOfRating)*(snapshot.ratingVals.ratingValue)) + ratingDat.starVal)/(snapshot.ratingVals.noOfRating + 1))
        ratSet.update({
            custRatings : snapshot.custRatings,
            ratingVals : {
                noOfRating : (snapshot.ratingVals.noOfRating + 1),
                ratingValue : ratVals
            }
        })
        
        return 200;
    },
    addWish: async function ({addWishDat}, req) {
        let boot = 0
        const db = firebase.firestore();
        const addWish = db.collection("customer")
        const addWshRef = db.collection("customer").doc(addWishDat.usId).get()
        .then(snapshot => {
            fullDat = snapshot.data()
            const oldWishList = fullDat.wish
            oldWishList.map(wishIt => {
                if (wishIt === addWishDat.prId){
                    boot = 1
                }
            })
            if(!boot){
                oldWishList.push(addWishDat.prId)
                addWish.doc(addWishDat.usId).update({
                    wish: oldWishList
                })
            }
        })
    }
}