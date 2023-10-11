import { useEffect, useState } from "react";
import { APIbaseURL } from "../constant";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const param = useParams();
  const [listing, setListing] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${APIbaseURL}/api/v1/listing/get/${param.id}`);
        const data = await res.json();

        if (data.success !== false) {
          setListing(data.data);
          setError(false);
        } else {
          setError(true);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };

    getListing();
  }, [param.id]);
  console.log(listing);
  return (
    <main>
      {loading && (
        <h3 className="text-2xl font-semibold mt-6 text-center">Loading...</h3>
      )}
      {error && (
        <h3 className="text-2xl font-semibold mt-6 text-center text-red-500">
          Someting Went Wrong!
        </h3>
      )}
      {listing && !loading && !error && (
        <>
          <Swiper navigation>
            {listing?.imageURLs.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[350px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </main>
  );
};

export default Listing;
