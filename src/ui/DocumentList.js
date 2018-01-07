import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Icon, Divider, Modal, Button, Input, InputNumber,message } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ShapeService from "../services/ShapeService.js"
const { TextArea } = Input;
class DocumentList extends React.Component {
	state = {
		visible: false,
		loading: false,
		model: {
			title: "",
			desc: "",
			width: 640,
			height: 960
		},
		pagination: {
			current: 1,
			pageSize: 20,
			total: 0
		},
		list: []
	}

	showModal = () => {
		this.setState({
			visible: true,
		});
	}

	changeModel(model) {
		model = Object.assign(this.state.model, model);
		this.setState({
			model: model
		});
	}

	handleOk = (e) => {
		var context = this;
		ShapeService.newDocument(this.state.model, function(doc) {
			context.setState({
				visible: false,
				model: {
					title: "",
					desc: "",
					width: 640,
					height: 960
				}
			});
			message.success('创建成功');
			context.loadPageList();
		}, function() {

		})

	}
	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
	}
	
	
	handleDelete(model){
		var context = this;
		ShapeService.removeDocument(model,function(d){
			 message.success('删除成功');
			 context.loadPageList();
		},function(){
			message.error('删除失败');
		});
	}

	handleChange(pagination, filters, sorter) {
		this.state.pagination.current= pagination.current;
		this.loadPageList();
	}

	loadPageList() {
		var context = this;
		var page = this.state.pagination.current || 1;
		var pageSize = this.state.pagination.pageSize || 20;
		this.setState({
			loading: true
		});
		ShapeService.getPageList(page, pageSize, function(list, count) {
			context.state.pagination.total = count;
			context.setState({
				list: list,
				loading: false
			});
		}, function() {

		})
	}

	componentDidMount() {
		this.loadPageList();
	}

	render() {

		const columns = [{
			title: '标题',
			dataIndex: 'title'
		}, {
			title: '描述',
			dataIndex: 'desc'
		}, {
			title: '创建时间',
			dataIndex: 'createdAt'
		}, {
			title: '操作',
			key: 'action',
			render: (text, record) => (
				<span>
			      <Link to={"/editor/"+record.id}>编辑</Link>
			      <Divider type="vertical" />
			      <Link to={"/show/"+record.id}>查看</Link>
			      <Divider type="vertical" />
			      <a href="#" onClick={()=>{this.handleDelete(record)}}>删除</a>
			    </span>
			)
		}];

		return(
			<div className="padding">
			    <Button type="primary" onClick={this.showModal}>新建</Button>
				<Table rowKey={record => record.id} loading={this.state.loading} dataSource={this.state.list} pagination={this.state.pagination} columns={columns} onChange={(pagination, filters, sorter)=>{this.handleChange(pagination, filters, sorter)}} />
				<Modal title="新页面" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
		          <div className="padding">
		              <Input placeholder="页面标题" value={this.state.model.title} onChange={(e)=>{this.changeModel({title:e.target.value})}}/>
		          </div>
		          <div className="padding">
		          	  <TextArea rows={4} placeholder="页面描述" value={this.state.model.desc} onChange={(e)=>{this.changeModel({desc:e.target.value})}} />
		          </div>
		          <div className="padding">
		          		宽度: <InputNumber min={1}  value={this.state.model.width} onChange={(value)=>{this.changeModel({width:value})}}  /> x 
		          		高度: <InputNumber min={1}  value={this.state.model.height} onChange={(value)=>{this.changeModel({height:value})}}  />
		          </div>
		        </Modal>
			</div>
		);
	}
}
export default DocumentList;