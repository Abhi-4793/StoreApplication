from flask import Flask ,request, jsonify 
import products_dao
import uom_dao
import json
from flask_cors import CORS
from sql_connection import getSqlConnection

app = Flask(__name__)
CORS(app)

connection = getSqlConnection()


@app.route('/getUOM', methods=['GET'])
def get_uoms():
    response = uom_dao.get_uoms(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/getallproducts',methods=['GET'])
def getallproducts():
    products = products_dao.getallproducts(connection)
    response = jsonify(products)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    
    
@app.route('/deleteproducts',methods=['POST'])
def deleteproducts():
    return_id = products_dao.delete_Products(connection, request.get_json())
    print(return_id,"return")
    response = jsonify({
        'product_id': return_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/insertproducts',methods=['POST'])
def insert_product():
    # request_payload = json.loads(request.get_json())
    print(request.get_json(),"payload")
    product_id = products_dao.insertNewProducts(connection, request.get_json())
    response = jsonify({
        'product_id': product_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    app.run(debug=True)
    print("starting Grocery store system ")
    app.run(port=5000)