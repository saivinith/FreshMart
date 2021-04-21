from flask import Flask, redirect, url_for,jsonify,request
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import json


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


mongoClient = MongoClient('mongodb://127.0.0.1:27017')
db = mongoClient.get_database('project')
tbl_user = db.get_collection('users')
tbl_prod = db.get_collection('products')
@app.route('/signup',methods=['POST'])
def signup():
    print("yes")
    users = request.get_json()
    email = users.get('email')
    username = users.get('username')
    password = users.get('password')
    cpassword = users.get('cpassword')
    mobile = users.get('mobile')
    if(tbl_user.count({"email":email})==0):
        tbl_user.insert_one({"email":email,"username":username,"password":password,"mobile":mobile})
    else:
        return jsonify({"error":"hope it works","code":500}) 
    return jsonify({"success":"hope it works","code":200,"username":username})

@app.route('/validate',methods=['POST'])
def validate():
    login = request.get_json()
    email = login.get('email')
    password = login.get('password') 
    if(tbl_user.count({"email":email,"password":password})==1):
        data = tbl_user.find({"email":email,"password":password})
        print("login success")
        return jsonify({"code":200,"username":data[0]['username']})
    else:
        return jsonify({"code":500})
@app.route('/product',methods=['POST'])
def product():
    products = request.get_data()
    #print(products)
    print((request.files['file']).filename)
    tbl_prod.insert_one({"name":request.form['name'],"price":request.form['price'],"Quantity":request.form['stock'],"shortDesc":request.form['shortDesc'],"description":request.form['description'],"file":(request.files['file']).filename})
    return jsonify({"code":200})

@app.route('/fetchProducts',methods=['GET'])
def fetchProducts():
    data = tbl_prod.find()
    res = []
    for d in data:
        d.pop('_id')
        res.append(d)
    #print(res)
    return json.dumps(res)
if __name__ == "__main__":
    app.run(debug=True)