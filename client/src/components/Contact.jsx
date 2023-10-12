import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APIbaseURL } from "../constant";
import { useSelector } from "react-redux";

export default function Contact({ listing }) {
  const { currentUser } = useSelector((state) => state.persistedReducer.user);

  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  console.log(message);
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(
          `${APIbaseURL}/api/v1/users/${listing.userRef}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({ token: currentUser.token }),
          }
        );
        const data = await res.json();
        setLandlord(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
