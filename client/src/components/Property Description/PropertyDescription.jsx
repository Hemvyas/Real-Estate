import React from "react";
import { Form, Input, Button, Select, message, InputNumber } from "antd";

const AddLocation = ({ property, setProperty }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const typeOptions = [
      { value: "1", label: "Condo" },
      { value: "2", label: "House" },
      { value: "3", label: "Apartment" },
      { value: "4", label: "Townhouse" },
      { value: "5", label: "Duplex" },
    ];
        const selectedTypeLabel = typeOptions.find(
          (option) => option.value === values.type
        )?.label;

    setProperty((prevState) => ({
      ...prevState,
      name: values.name,
      desc: values.desc,
      price: values.price,
      type: selectedTypeLabel || values.type,
    }));
    message.success("Processing complete!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChange = (value) => {};
  return (
    <Form
      form={form}
      name="description"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <div className="flexColStart">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please select your Name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="desc"
          rules={[
            { required: true, message: "Please input your Description!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input your price!" }]}
        >
          <InputNumber
            min={3000}
            max={1000000}
            defaultValue={1}
            onChange={onChange}
            changeOnWheel
          />
        </Form.Item>
        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: "Please input your Type!" }]}
        >
          <Select
            showSearch
            style={{
              width: 200,
            }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={[
              {
                value: "1",
                label: "Condo",
              },
              {
                value: "2",
                label: "House",
              },
              {
                value: "3",
                label: "Apartment",
              },
              {
                value: "4",
                label: "Townhouse",
              },
              {
                value: "5",
                label: "Duplex",
              },
            ]}
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

export default AddLocation;
