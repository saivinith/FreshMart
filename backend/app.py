from flask import Flask, redirect, url_for,jsonify,request,session
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import json
import datetime
import time
import hashlib

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.secret_key = "testing"

mongoClient = MongoClient('mongodb://127.0.0.1:27017')
db = mongoClient.get_database('project')
tbl_user = db.get_collection('users')
tbl_prod = db.get_collection('products')
tbl_fav = db.get_collection('favorites')
tbl_hist = db.get_collection('history')

@app.route('/signup',methods=['POST'])
def signup():
    users = request.get_json()
    email = users.get('email')              
    username = users.get('username')
    password = users.get('password')
    password  = hashlib.md5(password.encode())
    cpassword = users.get('cpassword')
    mobile = users.get('mobile')
    row_count = tbl_user.count()
    if(tbl_user.count({"email":email})==0):
        tbl_user.insert_one({"_id":row_count+1,"email":email,"username":username,"password":password.hexdigest(),"mobile":mobile})
    else:
        return jsonify({"error":"hope it works","code":500}) 
    #session['user'] = username
    return jsonify({"success":"hope it works","code":200,"username":username})

@app.route('/validate',methods=['POST'])
def validate():
    login = request.get_json()
    email = login.get('email')
    password = login.get('password')
    password = (hashlib.md5(password.encode())).hexdigest() 
    if(tbl_user.count({"email":email,"password":password})==1):
        data = tbl_user.find({"email":email,"password":password})
        user_fav = tbl_fav.count({'deleted' : {'$ne' : 1 },'userID':{'$eq':str(data[0]['_id'])}})
        #print(user_fav)
        #session['user'] = data[0]['_id']
        #print(session['user'])
        return json.dumps({"code":200,"username":data[0]['username'],"userId":data[0]['_id'],"cartItems":int(user_fav)})
    else:
        return jsonify({"code":401})

@app.route('/user',methods=['GET'])
def user():
        user_Count = tbl_user.count();
        return jsonify({"code":200,"id":user_Count})

@app.route('/product',methods=['POST'])
def product():  
            products = request.get_data()
            prod = tbl_prod.count()
            tbl_prod.insert_one({"_id":prod+1,"name":request.form['name'],"price":int(request.form['price']),"stock":int(request.form['stock']),"shortDesc":request.form['shortDesc'],"description":request.form['description'],"file":(request.files['file']).filename,"category":(request.form['category']),"deleted":0})
            return jsonify({"code":200})

@app.route('/fetchProducts',methods=['GET'])
def fetchProducts():
        data = tbl_prod.find({'deleted' : {'$ne' : 1 }})
        res = []
        for d in data:
            res.append(d)
        return json.dumps(res)


@app.route('/edit',methods=['POST'])
def edit():
        products = request.get_data()
        print(type(request.form['id']))
        tbl_prod.update_one({"_id":int(request.form['id'])},{"$set":{"name":request.form['name'],"price":request.form['price'],"stock":request.form['stock'],"shortDesc":request.form['shortDesc'],"description":request.form['description'],"file":(request.files['file']).filename,"category":(request.form['category'])}})
        return jsonify({"code":200})


@app.route('/delete',methods=['POST'])
def delete():
        card = request.get_json()
        print(card)
        card_id = int(card.get('id'))
        tbl_prod.update_one({"_id":card_id},{"$set":{"deleted":1}})
        return jsonify({"code":200})

@app.route('/addToCart',methods=['POST'])
def addToCart():
    cartItem = request.get_json()
    s = int(cartItem.get("stock"))
    favRows  = tbl_fav.count()
    #print(s)
    if(s>0):
        if(tbl_fav.count({'cardId' : {'$eq' : int(cartItem.get('id')) },'userID':{'$eq':cartItem.get("userID")}})==0):
            tbl_fav.insert_one({'_id':favRows+1,"cardId":cartItem.get('id'),"userID":cartItem.get("userID"),'name':cartItem.get("name"),'stock':cartItem.get("stock"),'price':cartItem.get("price"),'shortdesc':cartItem.get("shortdesc"),'Desc':cartItem.get("Desc"),'file':cartItem.get("file"),'category':cartItem.get("category"),'deleted':0,'quantity':1})
        else:
            data = tbl_fav.find({'cardId' : {'$eq' : int(cartItem.get('id')) },'userID':{'$eq':cartItem.get("userID")}})
            if(data[0]['deleted']==1):
                tbl_fav.update_one({"cardId":cartItem.get('id'),"userID":cartItem.get("userID")},{"$set":{'deleted':0,"quantity":1}})
            elif(data[0]['quantity']+1 <= int(data[0]['stock'])):
                tbl_fav.update_one({"cardId":cartItem.get('id'),"userID":cartItem.get("userID")},{"$set":{'quantity':data[0]['quantity']+1}})
            else:
                return jsonify({"error":"Stock Unavailable","code":500})
        return jsonify({"code":200})
    else:
        return jsonify({"code":500,"error":'stock not available'})

@app.route('/favorites',methods=['POST'])
def favorites():
        user = request.get_json()
        userID = user.get('userId')
        data = tbl_fav.find({'deleted' : {'$ne' : 1 },'userID':{'$eq':userID}})
        #print(data)
        res = []
        for d in data:
            res.append(d)
        #print(res)
        return json.dumps(res)

@app.route('/checkFav',methods=['POST'])
def checkFav():
    #print('fav')
    fav = request.get_json()
    cardID = fav.get('cardId')
    userID = fav.get('userId')
    data = tbl_fav.count({'cardId' : {'$eq' : int(cardID) },'userID':{'$eq':userID}})
    print(data)
    check = 1 if data>0 else 0
    print(check)
    return jsonify({"fav":check})

@app.route('/DeleteCartItem',methods=['POST'])
def DeleteCartItem():
    fav = request.get_json()
    favId = fav.get('id')
    print(favId)
    data = tbl_fav.find({'_id':int(favId)})
    #print(data)
    if(data[0]['quantity']>1):
        tbl_fav.update_one({'_id':favId},{'$set':{'quantity':data[0]['quantity']-1}})
    else:
        tbl_fav.update_one({'_id':favId},{'$set':{'deleted':1}})
    return jsonify({"code":200})    

@app.route('/history',methods=['POST'])
def history():  
    items = request.get_json()
    products = items.get('fav')
    #print(products)
    userId = items.get('userId')
    date = datetime.datetime.now()  
    date = str(date).split('.')[0]
    #print(products)
    tbl_hist.insert_one({date:products,'userID':userId})
    tbl_fav.update_many({'deleted' : {'$eq' : 0 },'userID':{'$eq':userId}},{'$set':{'deleted':1,'quantity':1}})
    for product in products:
         cart_item = tbl_fav.find({'cardId':{'$eq':product['cardId']},'userID':{'$eq':userId}})
         prod_det = tbl_prod.find({'_id':{'$eq':product['cardId']}})
         tbl_prod.update_one({'_id':{'$eq':product['cardId']}},{'$set':{'stock':0 if(int(prod_det[0]['stock'])-product['quantity']<0) else (int(prod_det[0]['stock'])-product['quantity'])}})
         tbl_fav.update_one({'cardId':{'$eq':product['cardId']},'userID':{'$eq':userId}},{'$set':{'stock':cart_item[0]['stock']-product['quantity']}})
    return jsonify({"code":200})

@app.route('/fetchHistory',methods=['POST'])
def fetchHistory(): 
    user = request.get_json()
    userID = user.get('userId')
    items = tbl_hist.find({'userID':{'$eq':userID}})
    items = (list(items))
    items = items[::-1]
    res = []
    for i in items:
        res.append([list(i.keys())[1],list(i.values())[1]])
    print(items)
    return json.dumps(res)

if __name__ == "__main__":
    app.run(debug=True)