const bookingRouter = require("express").Router();
const { makePayment, bookShow, getAllBookings} = require("../controller/booking");
const authMiddleware = require("../middleware/authMIddleware");
//add a booking
bookingRouter.post("/make-payment", authMiddleware, makePayment);

//get all booking
bookingRouter.post("/book-show", authMiddleware, bookShow)

//update a booking
bookingRouter.get("/all-bookings", authMiddleware, getAllBookings)

//hw 
// bookingRouter.get('/:id', adminAuth, bookingById);

module.exports = bookingRouter;