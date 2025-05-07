import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { getShowById } from "../calls/shows";
import { useParams } from "react-router-dom";
import { Card, Col, message, Row, Button } from "antd";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import { bookShow, makePayment } from "../calls/booking";
import { useNavigate } from "react-router-dom";
function BookShow() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.users);
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const getData = async () => {
    try {
      dispatch(showLoading);
      const response = await getShowById(params.id);
      if (response.success) {
        setShow(response.data);
        console.log(response.data);
      } else {
        console.log(response.message);
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const book = async (transactionId) => {
    try{
      const response = await bookShow({
        show: params.id,
        user: user._id,
        seats: selectedSeats,
        transactionId
      });
      if (response.success) {
        message.success("show has been booked!");
        navigate("/profile");
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    }catch(err){
      message.error(err.message);
      dispatch(hideLoading());
    }
  }

  const onToken = async (token) => {
    try{
      dispatch(showLoading());
      const response = await makePayment({token, amount: selectedSeats.length * show.ticketPrice*100});
      if(response.success){
        message.success(response.message);
        book(response.data);
      }else{
        message.error(response.message);
      }
      dispatch(hideLoading());
    }catch(err){
      message.error(err.message);
      dispatch(hideLoading())
    }
  }

  const getSeats = () => {
    //static data , use dyanmic
    let columns = 12;
    let totalSeats = 120;
    let rows = totalSeats / columns; // 10

    return (
      <div className="d-flex flex-column align-items-center">
        <div className="w-100 max-width-600 mx-auto mb-25px">
          <p className="text-center mb-10px">
            Screen this side, you will be watching in this direction
          </p>
          <div className="screen-div"></div>
        </div>
        <ul className="seat-ul justify-content-center">
          {Array.from(Array(rows).keys()).map((row) => {
            return Array.from(Array(columns).keys()).map((column) => {
              let seatNumber = row * columns + column + 1;

              let seatClass = "seat-btn";
              if (selectedSeats.includes(seatNumber)) {
                seatClass += " selected";
              }
              if (show.bookedSeats.includes(seatNumber)) {
                seatClass += " booked";
              }
              if (seatNumber <= totalSeats)
                return (
                  <li>
                    <button
                      className={seatClass}
                      onClick={() => {
                        if (selectedSeats.includes(seatNumber)) {
                          setSelectedSeats(
                            selectedSeats.filter(
                              (curSeatNumber) => curSeatNumber !== seatNumber
                            )
                          );
                        } else {
                          setSelectedSeats([...selectedSeats, seatNumber]);
                        }
                      }}
                    >
                      {seatNumber}
                    </button>
                  </li>
                );
            });
          })}
        </ul>

        <div className="d-flex bottom-card justify-content-between w-100 max-width-600 mx-auto mb-25px mt-3">
          <div className="flex-1">
            Selected Seats: <span>{selectedSeats.join(", ")}</span>
          </div>
          <div className="flex-shrink-0 ms-3">
            Total Price:{" "}
            <span>Rs. {selectedSeats.length * show.ticketPrice}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {show && (
        <Row gutter={24}>
          <Col span={24}>
            <Card
              title={
                <div className="movie-title-details">
                  <h1>{show.movie.name}</h1>
                  <p>
                    Theatre: {show.name}, {show.theatre.address}
                  </p>
                </div>
              }
              extra={
                <div className="show-name py-3">
                  <h3>
                    <span>Show Name:</span> {show.name}
                  </h3>
                  <h3>
                    <span>Date & Time: </span>
                    {moment(show.date).format("MMM Do YYYY")} at{" "}
                    {moment(show.time, "HH:mm").format("hh:mm A")}
                  </h3>
                  <h3>
                    <span>Ticket Price:</span> Rs. {show.ticketPrice}/-
                  </h3>
                  <h3>
                    <span>Total Seats:</span> {show.totalSeats}
                    <span> &nbsp;|&nbsp; Available Seats:</span>{" "}
                    {show.totalSeats - show.bookedSeats.length}{" "}
                  </h3>
                </div>
              }
              style={{ width: "100%" }}
            >
              {getSeats()}

              {selectedSeats.length > 0 && <StripeCheckout token={onToken} billingAddress amount={selectedSeats.length * show.ticketPrice*100} stripeKey="pk_test_2VmtDx5s0gIh5ojgsvijNrLa00GNgwwfEN">
              <div className="max-width-600 mx-auto">
                        <Button type="primary" shape="round" size="large" block>Pay Now</Button>
                    </div>
                </StripeCheckout>}
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}

export default BookShow;
