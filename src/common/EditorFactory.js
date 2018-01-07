import TextEditor from './editors/TextEditor';
import NumberEditor from './editors/NumberEditor';
import AnimationsEditor from './editors/AnimationsEditor';
class EditorFactory
{
	static create(schema){
		var editorMap={};
		editorMap["string"]=TextEditor;
		editorMap["number"]=NumberEditor;
		editorMap["animations"]=AnimationsEditor;
		return editorMap[schema.type]		
	}
}
export default EditorFactory;