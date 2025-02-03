from sql_connection import getSqlConnection

def getallproducts(connection):
  
    cursor = connection.cursor()
    query ="SELECT products.product_id ,products.name,products.uom_id,products.Price_PerUnit, uom.uom_name FROM products inner join uom on products.uom_id=uom.uom_id"
    cursor.execute(query)
    response = []
    for(product_id,name,uom_id,Price_PerUnit ,uom_name) in cursor:
        response.append({
        'product_id':product_id,
        'name':name,
        'uom_id':uom_id,
        'Price_PerUnit':Price_PerUnit,
        'uom_name':uom_name,
    })
        # connection.close()
    return response  

def insertNewProducts(connection,product):
    cursor = connection.cursor()

    query = "insert into products(name,uom_id,Price_PerUnit) values (%s,%s,%s)"
    data = (product['name'],product['category']['uom_id'],product['priceUnit'])
    cursor.execute(query,data)
    connection.commit()
    
    return cursor.lastrowid    

def delete_Products(connection,product_id):
   
    cursor = connection.cursor()
    print(product_id['id'],"product_id")
    query = ("DELETE FROM products WHERE product_id="+ str(product_id['id']))
    cursor.execute(query)
    connection.commit()
            
    return cursor.lastrowid
 
if __name__=='__main__':
    connection=getSqlConnection()
    print(getallproducts(connection))
    # print(insertNewProducts(connection,{
    #    'product_name':'Cabbage',
    #     'uom_id':'1',
    #     'price_per_unit':'33.9'
    # }))
    # print(deleteProducts(connection,4))
    