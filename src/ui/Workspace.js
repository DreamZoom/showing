import React from 'react';
import ReactDOM from 'react-dom';
import './editor.css';
import Graph from '../components/Graph';
import jquery from 'jquery';
import Rnd from 'react-rnd';
class Workspace extends React.Component {
	state = {
		count: 0
	}

	constructor(props) {
		super(props);
		this.graph = props.graph;
	}

	refresh() {
		this.setState({
			count: this.state.count + 1
		});
	}
	
	handleDrag(d){
		var context = this;
		var shape = context.props.graph.getSelectShape();
		this.makeLine(d.x-shape.x,d.y-shape.y);
		
	}
	
	handleDragStop(d){
		var context = this;
		var shape = context.props.graph.getSelectShape();
		if(!shape) return;
		shape.x= d.x;
		shape.y= d.y;
		context.props.onGraphChange(context.graph);
		
		jquery(context.refs.linex).hide();
		jquery(context.refs.liney).hide();
	}
	
	handleResize(d){
		var context = this;
		var shape = context.props.graph.getSelectShape();
		this.makeLine(d.x-shape.x,d.y-shape.y);
	}
	
	handleResizeStop(d){
		var context = this;
		var shape = context.props.graph.getSelectShape();
		if(!shape) return;
		shape.x= d.x;
		shape.y= d.y;
		shape.width= d.width;
		shape.height= d.height;
		context.props.onGraphChange(context.graph);
		jquery(context.refs.linex).hide();
		jquery(context.refs.liney).hide();
	}
	
	
	makeLine(tx,ty){
		var context = this;
		var points = context.graph.getAnchorPoints(430, 1920);
		var shape = context.props.graph.getSelectShape();
		if(!shape) return;

		var selectPoints = shape.getAnchorPoints(tx, ty);
		var lineX = null,
			lineY = null;

		for(var i = 0; i < selectPoints.length; i++) {
			for(var j = 0; j < points.length; j++) {
				if(selectPoints[i].x == points[j].x) {
					lineX = points[j];
				}
				if(selectPoints[i].y == points[j].y) {
					lineY = points[j];
				}
			}
		}

		if(lineX) {
			jquery(context.refs.linex).css({
				left: lineX.x + "px"
			});
			jquery(context.refs.linex).show();
		} else {
			jquery(context.refs.linex).hide();
		}
		if(lineY) {
			jquery(context.refs.liney).css({
				top: lineY.y + "px"
			});
			jquery(context.refs.liney).show();
		} else {
			jquery(context.refs.liney).hide();
		}
	}
	

	componentDidMount() {
		var context = this;
		var document = context.refs.document;
		var onmousedown = function(e) {

			var event = e || window.event;
			event.preventDefault();

			var point = {
				x: e.pageX - jquery(document).offset().left,
				y: e.pageY - jquery(document).offset().top
			};

		
			context.graph.hit(point);
			context.props.onGraphChange(context.graph);
		}
		jquery(document).bind("mousedown", onmousedown);

	}

	render() {
		this.graph = this.props.graph;
		var shape =  this.props.graph.getSelectShape();
		return(
			<div className="sui-editor-workspace">
			    <div className="sui-editor-document-warpper">
					<div className="sui-editor-document sui-editable" style={{width:this.props.width,height:this.props.height}} ref="document">
						{this.graph.render()}
						<div className="editor-drag" ref="drag"></div>
						<div className="editor-line-x" ref="linex"></div>
						<div className="editor-line-y" ref="liney"></div>
						
						{shape?
							<Rnd className="editor-drag"
							    onDrag={(e,d)=>{this.handleDrag(d)}} 
								onDragStop={(e,d)=>{this.handleDragStop(d)}} 
								onResizeStop={(e, direction, ref, delta, position) => {this.handleResizeStop({width: ref.offsetWidth,height: ref.offsetHeight,...position})}}
								onResize={(e, direction, ref, delta, position) => {this.handleResize({width: ref.offsetWidth,height: ref.offsetHeight,...position})}}
								default={{x: shape.x,y: shape.y,width: shape.width,height: shape.height}}></Rnd>:""}
						
					</div>
					
				</div>				
		    </div>
		);
	}
}
export default Workspace;