import React from "react";
import { Form, Button, message, InputNumber } from "antd";

const PropertyDeatils = ({ property, setProperty }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const updatedFacilities = {
      bedrooms: values.bedrooms,
      bathrooms: values.bathrooms,
    };

    if (values.parking) updatedFacilities.parking = values.parking;
    if (values.gym) updatedFacilities.gym = values.gym;
    if (values.swimming) updatedFacilities.swimming = values.swimming;

    setProperty((prev) => ({
      ...prev,
      facilities: updatedFacilities,
    }));

    message.success("Processing complete!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChange = (value) => {
    console.log("changed", value);
  };
  return (
    <Form
      form={form}
      name="propertyDeatils"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <div className="flexColStart">
        <Form.Item
          label="Bedrooms"
          name="bedrooms"
          rules={[{ required: true, message: "Please input your Bedrooms!" }]}
        >
          <InputNumber
            min={1}
            max={10}
            onChange={onChange}
            changeOnWheel
          />
        </Form.Item>

        <Form.Item
          label="Bathrooms"
          name="bathrooms"
          rules={[{ required: true, message: "Please input your bathrooms!" }]}
        >
          <InputNumber
            min={1}
            max={10}
            onChange={onChange}
            changeOnWheel
          />
        </Form.Item>

        <Form.Item
          label="Parking"
          name="parking"
          rules={[{ message: "Please input your parking!" }]}
        >
          <InputNumber
            min={1}
            max={3}
            onChange={onChange}
            changeOnWheel
          />
        </Form.Item>

        <Form.Item
          label="Gym"
          name="gym"
          rules={[{ message: "Please input your gym!" }]}
        >
          <InputNumber
            min={1}
            max={3}
            onChange={onChange}
            changeOnWheel
          />
        </Form.Item>

        <Form.Item
          label="Swimming"
          name="swimming"
          rules={[{ message: "Please input your swimming!" }]}
        >
          <InputNumber
            min={1}
            max={3}
            onChange={onChange}
            changeOnWheel
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default PropertyDeatils;
