import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../utils/firebase";
import { APIbaseURL } from "../constant/index.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSuccess } from "../features/user/userSlice";
import { toast } from "react-toastify";

const OauthBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch(APIbaseURL + "/api/v1/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
      toast.success("Selamat datang " + data.data.username);
    } catch (error) {
      console.log("couldn't sign in with google", error);
    }
  };
  return (
    <button
      onClick={handelGoogleClick}
      type="button"
      className="capitalize text-sm p-3 w-full bg-red-700 hover:opacity-90 disabled:opacity-80 rounded-lg text-white font-medium"
    >
      continue with google
    </button>
  );
};

export default OauthBtn;
