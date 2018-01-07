import React from 'react';
import EditorFactory from './EditorFactory';
class PropertyGrid extends React.Component
{
	constructor(props) {  
		super(props); 		
		this.schemas= props.schemas || [];
		this.propertys= props.propertys || {};
	}
	
	handleChange(name,value){
		this.propertys= this.props.propertys || {};
		this.propertys[name]=value;
		if(this.props.onChange){
			this.props.onChange(this.propertys);
		}
	}
	
	render() {  
		var context= this;
		this.schemas= this.props.schemas || [];
		this.propertys= this.props.propertys || {};
		var editors = this.schemas.map(function(schema,i){
			var Editor= EditorFactory.create(schema);
			return (<div key={i}>
				    	<div>{schema.label||schema.name}</div>
					    <div> 
					    	<Editor schema={schema} value={context.propertys[schema.name]} onChange={(value)=>{context.handleChange(schema.name,value)}} />
					    </div>
				    </div>
				    );
		});
		
		return (<div className="sui-property-grid">{editors}</div>);
	}
}
export default PropertyGrid;