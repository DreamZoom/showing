class StyleParser{
	static parse(props){
		var obj ={};
		for (var p in props) {
			obj[StyleParser.parseName(p)] = StyleParser.parseValue(p,props[p]);
		}
		return obj;
	}
	
	static parseName(name){
		switch(name){
			case "x":
				return "left";
			case "y":
				return "top";
			case "rotate":
				return "transform";
			default:
			    return name;
		}
		return name;
	}
	
	static parseValue(name,value){
		switch(name){
			case "rotate":
				return "rotate("+value+"deg)";
			default:
			    return value;
		}
		return value;
	}
}
export default StyleParser;