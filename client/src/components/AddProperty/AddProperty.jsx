import React, { useEffect, useState } from 'react'
import { Row, Col, Modal, Steps, theme, message, Button } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import AddLocation from '../AddLocation/AddLocation';
import UploadImage from '../UploadImage/UploadImage';
import PropertyDetails from '../PropertyDetails/PropertyDetails';
import PropertyDescription from "../Property Description/PropertyDescription"
import {useMutation} from "react-query"
import { toast } from "react-toastify"
import { createResidency } from '../../utils/api';

const AddProperty = ({ isVisible ,setIsVisible}) => {
  const { user } = useAuth0();
  const token=localStorage.getItem("token");
  const [property, setProperty] = useState({
    name: "",
    desc: "",
    country: "",
    city: "",
    price: 0,
    address: "",
    image: null,
    facilities: {
      bedrooms: 0,
      bathrooms: 0,
      parking: 0,
      gym: 0,
      swimming: 0,
    },
    userEmail: null,
  });
  useEffect(() => {
    if (user?.email) {
      setProperty((prevProperty) => ({
        ...prevProperty,
        userEmail: user?.email,
      }));
    }
  }, [user]);
  const { mutate, isLoading } = useMutation({
    mutationKey: "addproperty",
    mutationFn: () =>
      createResidency(
        {
          ...property,
        },
        token
      ),
    onError: ({ response }) => toast.error(response.data.message),
    onSettled: () => {
      toast.success("Property added successfully");
      setProperty({
        name: "",
        desc: "",
        country: "",
        city: "",
        price: 0,
        address: "",
        image: null,
        facilities: {
          bedrooms: 0,
          bathrooms: 0,
          parking: 0,
          gym: 0,
          swimming: 0,
        },
        userEmail: null,
      });
      setIsVisible(false);
    },
  });
  
  const steps = [
    {
      title: "Location",
      content: <AddLocation property={property} setProperty={setProperty} />,
    },
    {
      title: "Upload",
      content: <UploadImage property={property} setProperty={setProperty} />,
    },
    {
      title: "Description",
      content: (
        <PropertyDescription property={property} setProperty={setProperty} />
      ),
    },
    {
      title: "Facilities",
      content: (
        <PropertyDetails property={property} setProperty={setProperty} />
      ),
    },
  ];
      const showModal = () => {
        setIsVisible(true);
      };
      const handleOk = () => {
        setIsVisible(false);
      };
      const handleCancel = () => {
        setIsVisible(false);
      };

      // const { token } = theme.useToken();
      const [current, setCurrent] = useState(0);
      const next = () => {
        setCurrent(current + 1);
      };
      const prev = () => {
        setCurrent(current - 1);
      };
      const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
      }));
 

  return (
    <>
      <Modal
        open={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={9000}
      >
        <Row justify="center" style={{ height: "38rem", maxWidth: "1200px" }}>
          <Col span={100}>
            <Steps current={current} items={items} />
            <div>{steps[current].content}</div>
            <div
              style={{
                marginTop: 24,
              }}
            >
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Next
                </Button>
              )}
              { current === steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={() =>mutate()}
                  disabled={isLoading}
                >
                  {isLoading?"Submitting...":"Add Property"}
                </Button>
              )}
              {current > 0 && (
                <Button
                  style={{
                    margin: "0 8px",
                  }}
                  onClick={() => prev()}
                >
                  Previous
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default AddProperty
