import React from 'react';
import { Row, Col, Form, Input, Button, Icon } from 'antd';

const FormItem = Form.Item;

function LogInForm() {
  return (
    <Row type="flex" justify="space-around" align="middle">
      <Col xs={8} >
        <Form
          onSubmit={(e) => {e.preventDefault(); console.log("Submited")}}
          className="login-form"
        >
          <FormItem required>
            <Input prefix={<Icon type="user" />} placeholder="Username" />
          </FormItem>
          <FormItem>
            <Input prefix={<Icon type="lock" />} placeholder="Password"/>
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
              icon="login"
            >
              Log in
            </Button>
          </FormItem>
        </Form>
      </Col>
    </Row>
  );
}

export default LogInForm;
