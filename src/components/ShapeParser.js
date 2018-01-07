import Shape from './shapes/Shape';
import TextShape from './shapes/TextShape';
import ImageShape from './shapes/ImageShape';
import IframeShape from './shapes/IframeShape';
class ShapeParser
{
	static parse(propertys){
		var shape = null;
		switch (propertys.__type__){
			case TextShape.name:
				shape =new TextShape();
				break;
			case ImageShape.name:
				shape =new ImageShape();
				break;
			case IframeShape.name:
				shape =new IframeShape();
				break;
			default:
				shape = new Shape();
				break;
		}
		shape.load(propertys);
		return shape;
	}
}
export default ShapeParser;