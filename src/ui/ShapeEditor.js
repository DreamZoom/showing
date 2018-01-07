import './editor.css';
import './animate.css';
import React from 'react';
import Document from '../components/Document';
import Workspace from './Workspace';
import PropertyGrid from '../common/PropertyGrid';
import jquery from 'jquery';
import animations from "../common/animations.js"
import ShapeService from "../services/ShapeService.js"
import { Layout, Menu, Breadcrumb, Icon, Button, Modal, Input, Table, Upload, message, Tabs,Tree  } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const TreeNode = Tree.TreeNode;

class ShapeEditor extends React.Component {
	state={
		change:0,
		count:0,
		width:640,
		height:960
	}
	
	constructor(props) {
		super(props);
		this.graphDocument =new Document();

		
	}
	
	componentDidMount(){
		var id =this.props.match.params.id;
		console.log(id);
		var context= this;
		ShapeService.getDocument(id,function(doc){
			if(doc.body){
				var docbody = JSON.parse(doc.body);
				context.graphDocument.load(docbody);
				context.refresh();
			}
			context.setState({
				width:doc.width,
		        height:doc.height
			});
		},function(){
			message.error("加载失败");
		})
	}
	
	storeDocument(){
		var id =this.props.match.params.id;
		ShapeService.StoreDocument(id,this.graphDocument);
	}
	
	handleSeve(){
		var id =this.props.match.params.id;
		var docbody=JSON.stringify(this.graphDocument);
		ShapeService.saveDocumentBody(id,docbody,function(){
			message.success("保存成功");
		},function(){
			message.success("保存失败");
		});
	}
	
	addGraph(){
		this.graphDocument.addGraph();		
		this.refresh();
	}
	
	removeGraph(){
		this.graphDocument.removeSelected();		
		this.refresh();
	}
	
	handleChangeGraphTitle(title){
		var graph = this.graphDocument.getSelected();
		if(graph){
			graph.title=title;
		}
		this.refresh();
	}
	
	handleSelectGraph(keys){
		if(keys.length>0){
			this.graphDocument.select(parseInt(keys[0]));
			this.refresh();
		}
	}
	
	handleDropGraph(info){
		const dropKey = info.node.props.eventKey;
        const dragKey = info.dragNode.props.eventKey;
		this.graphDocument.swap(dropKey,dragKey);
		this.refresh();
	}
	
	handleRefresh(){
		this.refresh();
	}
	
	refresh(){
		this.storeDocument();
		
		this.setState({
			count:this.state.count+1
		});
	}
	

	handleNewShape(property){	
		var graph = this.graphDocument.getSelected();
		if(graph){
			if(property.type=="text"){
				graph.newTextShape();
			}
			if(property.type=="image"){
				graph.newImageShape();
			}
			if(property.type=="page"){
				graph.newIframeShape();
			}
			this.refresh();
		}		
	}
	
    handlePreviewAnimation(){
    	animations.previewPageAnimation();
    }

	
	render(){
		
		var pages = this.graphDocument.getGraphs().map(function(graph,i){
			
			return(<TreeNode title={graph.title} key={i} />);
		});
		var graph = this.graphDocument.getSelected();
		
		
		return(
			<Layout className="sui-editor">
			  <Header className="sui-editor-header">
			  	  <div className="sui-editor-logo">Presentation编辑器</div>
			      <div className="sui-editor-actions">
			          <Button ghost={true} onClick={()=>{this.handlePreviewAnimation()}}>预览</Button>
			      	  <Button ghost={true} onClick={()=>{this.handleClick()}}>设置</Button>
			      	  <Button ghost={true} onClick={()=>{this.handleSeve()}}>保存</Button>
				      <Button ghost={true} onClick={()=>{this.handleClick()}}>退出</Button>
			      </div>
			      <div className="sui-editor-tools">
				      <Button ghost={true} onClick={()=>{this.handleNewShape({type:"text"})}}>文本</Button>
				      <Button ghost={true} onClick={()=>{this.handleNewShape({type:"image"})}}>图片</Button>
				      <Button ghost={true} onClick={()=>{this.handleNewShape({type:"page"})}}>页面</Button>
				      <Button ghost={true} onClick={()=>{this.handleNewShape({type:"chart"})}}>图表</Button>
				      <Button ghost={true} onClick={()=>{this.handleNewShape({type:"video"})}}>视频</Button>			      
			      </div>			      
			  </Header>
			  <Layout>
			    <Sider className="sui-editor-sider">
				    <div className="sui-pages-action">
				        <Button onClick={()=>{this.addGraph()}}>添加</Button>
				    	<Button onClick={()=>{this.removeGraph()}}>删除</Button>	
				        <Input value={graph?graph.title:""} onChange={(e)=>{this.handleChangeGraphTitle(e.target.value)}}/>				    	  
				    </div>
			    	<Tree draggable onDrop={(e)=>{this.handleDropGraph(e)}} onSelect={(keys)=>{this.handleSelectGraph(keys)}} selectedKeys={[""+this.graphDocument.selected]} >
				         {pages}
				    </Tree>
			    </Sider>
			    <Content>
			        {graph?<Workspace width={this.state.width} height={this.state.height} graph={graph} onGraphChange={(g)=>{this.handleRefresh(g)}}/>:""}
			    	
			    </Content>
			    <Sider className="sui-editor-sider">
			        {graph?(graph.getSelectShape()?<PropertyGrid schemas={graph.getSelectShape().schemas} propertys={graph.getSelectShape()} onChange={()=>{this.handleRefresh()}} />:""):""}			    	
			    </Sider>
			  </Layout>
			</Layout>
		);
	}
}

export default ShapeEditor;