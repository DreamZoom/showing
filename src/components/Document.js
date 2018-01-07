import React from 'react';
import Graph from './Graph';
class Document {
	constructor() {
		this.graphs = [];
		this.selected = -1;
		this.__type__= Document.name;
	}
	
	load(doc){
		var context=this;
		if(doc.graphs){
			doc.graphs.map(function(item,i){
				var graph =context.addGraph();
				graph.load(item);
			});
		}
	}
	
	addGraph(){
		var graph =new Graph("page "+(this.graphs.length+1));
		this.graphs.push(graph);
		this.select(this.graphs.length-1);
		return graph;
	}
	
	removeGraph(index){
		if(!(index>=0 && index<=(this.graphs.length-1))) return;
		this.graphs.splice(index, 1);
	}
	
	removeSelected(){
		this.removeGraph(this.selected);
		this.select(this.selected-1);
	}
	
	getGraph(index){
		if(index>=0 && index<=(this.graphs.length-1)){
			return this.graphs[index];
		}
		return null;
	}
	getSelected(){
		if(this.selected==-1) return null;
		return this.graphs[this.selected];
	}
	getGraphs(){
		return this.graphs;
	}
	
	swap(a,b){
		if(!(a>=0 && a<=(this.graphs.length-1))) return;
		if(!(b>=0 && b<=(this.graphs.length-1))) return;
		if(a==b) return;
		
		var tmp = this.graphs[a];
		this.graphs[a] = this.graphs[b];
		this.graphs[b]=tmp;
	}
	
	select(index){
		if(index>=0 && index<=(this.graphs.length-1)){
			this.selected = index;
		}
	}
}
export default Document;