import React from 'react';
import Editor from './Editor';
import { Row, Col,Input,Collapse,Button,Select ,InputNumber ,Switch,Icon ,Tooltip } from 'antd';
const Panel = Collapse.Panel;
const Option = Select.Option;
const OptGroup = Select.OptGroup;
import './AnimationsEditor.css';
import animates from "../animations.js"

class AnimationsEditor extends Editor
{
	state={
		count:0
	}
	
	refresh(){
		var animations = this.props.value|| [];
		this.handleChange(animations)
		this.setState({
			count:this.state.count+1
		});
	}
	handleUpdateAnimation(animation,propertyName,value,index){
		animation[propertyName]=value;
		this.refresh();
	}
	
	handleRemoveAnimation(i){
		var animations = this.props.value|| [];
		animations.splice(i, 1);
		this.refresh();
	}
	
	handleAddAnimation(){
		var animations = this.props.value|| [];
		animations.push({
			name:"none",
			duration:1,
			timingFunction:"ease",
			delay:0,
			iterationCount:1,
			direction:"normal"
		});
		this.refresh();
	}
	
	render(){
		var animations = this.props.value|| [];
		const that = this;
		const animation_options=animates.ANIMATION_LIST.map(function(group,i){			
			return (
				<OptGroup label={group.groupName} key={i}>
			     {
			     	group.animations.map(function(ani,index){
			     		return (<Option value={ani.name} key={index}>{ani.text}</Option>);
			     	})
			     }
			    </OptGroup>
			);
			
		});
		var animation_list = animations.map(function(animation,i){
			var header = (
				<div>
				    <span>动画{animation.name}</span>
					<span className="sui-button-delete-animate" onClick={()=>{that.handleRemoveAnimation(i)}}>
				    	<Tooltip placement="left" title="删除动画">
					    	<Icon type="delete" />
					  	</Tooltip>
	  				</span>	  
				</div>
							
			);
			return(
				<Panel header={header} key={i+1} className="sui-animation-item">				    	
	  				<div>
	  					<div>动画</div>
	  					<div>
		  					<Select value={animation.name} style={{width:'100%'}} onChange={(value)=>{ that.handleUpdateAnimation(animation,"name",value,i)}} >
					      		<Option value="none">无</Option>
							    {animation_options}
							</Select>
	  					</div>
	  				</div>	  				
	  				<div>
	  					<div>时长</div>
	  					<div>
		  					<InputNumber min={0} max={10} step={0.1} value={animation.duration} onChange={(value)=>{ that.handleUpdateAnimation(animation,"duration",value,i)}} />
	  					</div>
	  				</div>		
					<div>
	  					<div>延时</div>
	  					<div>
		  					<InputNumber min={0} max={10} step={0.1} value={animation.delay}  onChange={(value)=>{ that.handleUpdateAnimation(animation,"delay",value,i)}} />
	  					</div>
	  				</div>				    
					<div>
	  					<div>次数</div>
	  					<div>
		  					<InputNumber min={0} max={10} value={animation.iterationCount}  onChange={(value)=>{ that.handleUpdateAnimation(animation,"iterationCount",value,i)}} />
	  					</div>
	  				</div>  
			    </Panel>
			);
		});
		return (
			<div className="sui-animates-editor">
			    <Collapse bordered={false} defaultActiveKey={['1']}>
			    	{animation_list}
			    </Collapse>
				<div className="sui-animation-actions">
					<Button type="primary" onClick={()=>{this.handleAddAnimation()}}>添加动画</Button>					
				</div>
			</div>
			);
	}
}
export default AnimationsEditor;