import React, { useState } from "react";
import { Modal, Button, DatePicker } from "antd";
import { useMutation } from "react-query";
import moment from "moment";
import { bookVisit } from "../../utils/api";
import { toast } from "react-toastify";

const BookingModal = ({ propertyId, email, isVisible, setIsVisible }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const token=localStorage.getItem("token");
  const handleBookingSuccess=()=>{
    toast.success("Your visit has been successfully booked!");
  }
  const {mutate,isLoading}=useMutation({
    mutationFn:()=>bookVisit(propertyId,email,selectedDate,token),
    onSuccess:()=>handleBookingSuccess(),
    onError:({response})=>toast.error(`Failed to book the visit: ${response?.data.message}`),
    onSettled:()=>setIsVisible(false)
  })

  const handleOk = () => {
    mutate();
    setIsVisible(false);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  const onDateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

   const disabledDate = (current) => {
     return current && current < moment().startOf("day");
   };

  return (
    <>
      <Modal
        title="Select your date of visit"
        open={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={!selectedDate ? { disabled: true } : null}
      >
        <DatePicker
          onChange={onDateChange}
          selectedDate={selectedDate}
          disabledDate={disabledDate}
        />
      </Modal>
    </>
  );
};

export default BookingModal;
