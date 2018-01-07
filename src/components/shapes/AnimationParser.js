class AnimationParser{
	static parse(animations){
		animations = animations||[];
		
		return AnimationParser.getAnimations(animations);
	}
	static convertAnimationValue(ani_prop,value){		
		if(ani_prop=="duration"){
			return value+"s";
		}
		if(ani_prop=="delay"){
			return value+"s";
		}
		if(ani_prop=="iterationCount" && value==0){
			
			return "infinite";
		}
		return value;
	}
	static convertAnimationAttribute(animation){
		var ani_attr =[];
		for (var a in animation) {
			ani_attr.push(AnimationParser.convertAnimationValue(a,animation[a]));
		}
		return ani_attr.join(" ");
	}
	static getAnimations(animations){
		var ani_list=[];
		for (var i=0;i<animations.length; i++) {
			ani_list.push(AnimationParser.convertAnimationAttribute(animations[i]));
		}
		return ani_list.join("|");
	}
}
export default AnimationParser;