import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

const verifyToken = async (token) => {
    let flag = false;
    const users = await getDocs(collection(db, "users"));
    users.forEach((element) => {
        if (element.data().id == token) {
            // console.log(flag);
            flag = true;
        }
    });
    return flag;
};

export default verifyToken;
