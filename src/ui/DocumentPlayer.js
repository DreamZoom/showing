import './show.css';
import './swiper.css';
import React from 'react';
import ReactDOM from 'react-dom';
import ShapeService from "../services/ShapeService.js"
import Document from '../components/Document';
import Swiper from 'react-id-swiper';
import animations from "../common/animations.js"
class DocumentPlayer extends React.Component {
	state = {
		count: 0,
		loaded: false,
		width: 640,
		height: 960
	}
	constructor(props) {
		super(props);
		this.graphDocument = new Document();

	}
	componentDidMount() {
		var id = this.props.match.params.id;
		var context = this;
		var swiper = this.refs.swiper
		ShapeService.getDocument(id, function(doc) {
			if(doc.body) {
				var docbody = JSON.parse(doc.body);
				context.graphDocument.load(docbody);
				context.setState({
					loaded: true,
					width: doc.width,
					height: doc.height,
				});
			}
		}, function() {
			message.error("加载失败");
		})
	}

	refresh() {
		this.setState({
			count: this.state.count + 1
		});
	}

	render() {

		const params = {
			direction: 'vertical',
			slidesPerView: 'auto',
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true
			},
			spaceBetween: 10,
			mousewheel: true,
			on: {
				init: function() {
					var page = this.slides[this.snapIndex];
					(function(page){
						animations.prevInit();
						setTimeout(function(){		
							animations.playPageAnimation(page);
						},100);
					})(page);
					console.log(this);
				},
				slideChangeTransitionEnd: function() {
					var page = this.slides[this.snapIndex];
					(function(page){
						animations.prevInit();
						setTimeout(function(){		
							animations.playPageAnimation(page);
						},100);
					})(page);
				}
			}
		};

		var size = { width: this.state.width, height: this.state.height };

		var realWidth = document.body.offsetWidth;
		var scale = realWidth / size.width;
		var realHeight = size.height * scale;
		var sectionStyle = { ...size };
		//sectionStyle.transform="translateZ(0) scale(" + scale + ")";
		sectionStyle.zoom = scale;
		var pagelist = this.graphDocument.graphs.map(function(graph, i) {
			return(
				<div key={i} style={{height:realHeight}}>
				    <div className="swiper-page" style={{height:realHeight}}>
						<div className="sui-section" style={sectionStyle}>
						    {graph.render()}
						</div>
					</div>
				</div>
			);
		});

		return(
			<div className="page-container" >{this.state.loaded?<Swiper {...params}>{pagelist}</Swiper>:"正在加载..."}</div>
		);
	}
}
export default DocumentPlayer;