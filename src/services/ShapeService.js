class ShapeService {
	static saveDocumentBody(id, docbody, successFunc, errorFunc) {
		var Document = Bmob.Object.extend("Document");
		var query = new Bmob.Query(Document);
		query.get(id, {
			success: function(findObject) {
				// The object was retrieved successfully.
				
				findObject.set("body", docbody);
				
				findObject.save(null, {
					success: function(object) {
						if(successFunc) successFunc(object);
					},
					error: function(model, error) {
						if(errorFunc) errorFunc(error);
					}
				});
			},
			error: function(object, error) {
				if(errorFunc) errorFunc(error);
			}
		});
	}

	static newDocument(doc, successFunc, errorFunc) {
		var Document = Bmob.Object.extend("Document");
		var document = new Document();
		var currentUser = Bmob.User.current();
		document.set("userid", currentUser.id);
		document.set("title", doc.title);
		document.set("desc", doc.desc);
		document.set("width", doc.width);
		document.set("height", doc.height);
		document.set("time", new Date().getTime());
		document.save(null, {
			success: function(object) {
				if(successFunc) successFunc(object);
			},
			error: function(model, error) {
				if(errorFunc) errorFunc(error);
			}
		});
	}

	static removeDocument(doc, successFunc, errorFunc) {
		var Document = Bmob.Object.extend("Document");
		var query = new Bmob.Query(Document);
		query.get(doc.id, {
			success: function(findObject) {
				// The object was retrieved successfully.
				findObject.destroy({
					success: function(deleteObject) {
						if(successFunc) successFunc(deleteObject);
					},
					error: function(model, error) {
						if(errorFunc) errorFunc(error);
					}
				});
			},
			error: function(object, error) {
				if(errorFunc) errorFunc(error);
			}
		});
	}

	static getDocument(id, successFunc, errorFunc) {
		var Document = Bmob.Object.extend("Document");
		var query = new Bmob.Query(Document);
		query.get(id, {
			success: function(findObject) {
				if(successFunc) successFunc(ShapeService.toModel(findObject));
			},
			error: function(object, error) {
				if(errorFunc) errorFunc(error);
			}
		});
	}

	static getPageList(page, size, successFunc, errorFunc) {
		var Document = Bmob.Object.extend("Document");
		var query = new Bmob.Query(Document);
		var currentUser = Bmob.User.current();
		query.equalTo("userid", currentUser.id);
		query.count({
			success: function(count) {
				query.ascending("createdAt");
				query.limit(size);
				query.skip((page - 1) * size);

				query.find({
					success: function(results) {
						var list = results.map(function(item, i) {
							return ShapeService.toModel(item);
						});
						if(successFunc) successFunc(list, count);
					},
					error: function(error) {
						if(errorFunc) errorFunc(error);
					}
				});
			},
			error: function(error) {
				if(errorFunc) errorFunc(error);
			}
		});

	}

	static toModel(obj) {
		var model = {
			createdAt: obj.createdAt,
			id: obj.id,
			updatedAt: obj.updatedAt,
		};
		return { ...model, ...obj.attributes };
	}

	static getLast(successFunc, errorFunc) {
		var Document = Bmob.Object.extend("Document");
		var document = new Document();
		document.set("doc", doc);
		document.set("time", new Date().getTime());
		document.save(null, {
			success: function(object) {
				if(successFunc) successFunc(object);
			},
			error: function(model, error) {
				if(errorFunc) errorFunc(object);
			}
		});
	}

	static StoreDocument(docKey, doc) {
		var historyJson = localStorage.getItem(docKey) || "[]";
		var historyList = JSON.parse(historyJson) || [];
		historyList.push({
			doc: JSON.stringify(doc),
			time: new Date().getTime()
		});
		localStorage.setItem(docKey, JSON.stringify(historyList));
	}

	static isLogin() {
		var currentUser = Bmob.User.current();
		return currentUser;
	}

	static Login(data, successFunc, errorFunc) {
		Bmob.User.logIn(data.username, data.password, {
			success: function(user) {
				if(successFunc) successFunc(user);
			},
			error: function(user, error) {
				if(errorFunc) errorFunc(user, error);
			}
		});
	}

	static Register(data, successFunc, errorFunc) {
		var user = new Bmob.User();
		user.set("username", data.username);
		user.set("password", data.password);
		user.set("email", data.email);


		user.signUp(null, {
			success: function(user) {
				if(successFunc) successFunc(user);
			},
			error: function(user, error) {				
				if(errorFunc) errorFunc(user, error);
			}
		});
	}
}
export default ShapeService;