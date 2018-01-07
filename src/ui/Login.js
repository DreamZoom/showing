import React from 'react';
import ReactDOM from 'react-dom';
import jquery from 'jquery';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import { hashHistory  } from 'react-router'  //引入路由函数



import ShapeService from "../services/ShapeService.js"
class Login extends React.Component {
	state={
		isRegist:false
	}
	
	handleSubmit = (e) => {
		var context = this;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if(!err) {
				
				if(context.state.isRegist){
					ShapeService.Register(values,function(user){
						context.setState({isRegist:false});
					});
				}
				else{
					ShapeService.Login(values,function(user){
						hashHistory.push('/')   
					});
				}
				
				console.log('Received values of form: ', values);
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return(
		    <div className="login-box">
			<Form onSubmit={this.handleSubmit} className="login-form">
		        <FormItem>
		          {getFieldDecorator('username', {
		            rules: [{ required: true, message: 'Please input your username!' }],
		          })(
		            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
		          )}
		        </FormItem>
		        <FormItem>
		          {getFieldDecorator('password', {
		            rules: [{ required: true, message: 'Please input your Password!' }],
		          })(
		            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
		          )}
		        </FormItem>
		        
		        {this.state.isRegist? <FormItem>
		          {getFieldDecorator('email', {
		            rules: [{ required: true, message: '请输入你的邮箱地址，将用于找回密码!' }],
		          })(
		            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="邮箱" />
		          )}
		        </FormItem>:""
		        }
		       
		        
		        <FormItem>
		          <Button type="primary" htmlType="submit" className="login-form-button">
		            {!this.state.isRegist?"登录":"注册"}
		          </Button>
		          或者 <a onClick={()=>{this.setState({isRegist:true})}}>注册账户!</a>
		        </FormItem>
		    </Form>
		   </div>
		);
	}
}
export default Login;