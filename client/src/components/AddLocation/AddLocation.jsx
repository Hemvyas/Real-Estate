import React, { useState } from "react";
import { Form, Input, Button,Select,message } from "antd";
import useCountries from "../../hooks/useCountries";
import Map from "../Map/Map"
const AddLocation = ({property,setProperty}) => {
  const [form] = Form.useForm();
  const {getAllCountries}=useCountries();
  const [mapLocation, setMapLocation] = useState({
    country: "",
    city: "",
    address:""
  });
  const onFinish = (values) => {
    setMapLocation({
      country: values.country?.trim(),
      city: values.city?.trim(),
      address: values.address?.trim(),
    });
    setProperty((prev) => ({
      ...prev,
      country: values.country,
      city: values.city,
      address: values.address,
    }));
    message.success("Processing complete!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="addLocation"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <div
        className="flexCenter"
        style={{
          gap: "3rem",
          marginTop: "3rem",
          justifyContent: "space-between",
          flexDirection:"row"
        }}
      >
        <div className="flexColStart" style={{flex:"1"}}>
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please select your Country!" }]}
          >
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.label.toLowerCase().includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                optionA.label
                  .toLowerCase()
                  .localeCompare(optionB.label.toLowerCase())
              }
              options={getAllCountries()}
            />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please input your city!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>

        <div 
        style={{flex:"1"}}>
          <Map {...mapLocation} />
        </div>
      </div>
    </Form>
  );
};

export default AddLocation;
