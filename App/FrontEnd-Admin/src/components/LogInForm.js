import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, Input, Button, Icon } from 'antd';

import { logIn } from '../actions';

import language from '../lang';

const FormItem = Form.Item;


const mapStateToProps = state => {
  return {lang: state.lang};
};

const mapDispatchToProps = dispatch => {
  return {
    logIn: values => dispatch(logIn(values))
  }
}

class LogInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      password: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(`Received values of form: ${JSON.stringify(values)}\n`);
        this.props.logIn(values);
      } else {
        console.log(`Errors\nValues: ${JSON.stringify(values)}\n`);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form,
          lang = this.props.lang;

    return (
      <Row type="flex" justify="space-around" align="middle">
        <Col xs={8} >
          <Form
            onSubmit={this.handleSubmit}
            className="login-form"
          >
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: language[lang].feedback.emptyUsername }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={language[lang].placeholder.username} />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: language[lang].feedback.emptyPassword }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={language[lang].placeholder.password} />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
                icon="login"
                size="large"
              >
                {language[lang].button.login}
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(LogInForm);
const ReducedLoginForm = connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);


export default ReducedLoginForm;
