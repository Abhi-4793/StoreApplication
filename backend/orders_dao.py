from sql_connection import getSqlConnection
from datetime import datetime

def insert_order(connection,order):
    cursor = connection.cursor()
    order_query = ("INSERT INTO orders (customerName,total,datetime) VALUES(%s,%s,%s)")
    order_data = (order['customerName'],order['total'],datetime.now())
    
    cursor.execute(order_query,order_data)
    order_id = cursor.lastrowid
    
    order_details_query = ("INSERT INTO order_details"
                           "(order_id,prdouct_id,quantity,total_price)"
                           "VALUES (%s,%s,%s,%s)")
    order_details_data = []
    for order_detail_record in order['order_details']:
        order_details_data.append([
            order_id,
            int(order_detail_record['prdouct_id']),
            float(order_detail_record['quantity']),
            float(order_detail_record['total_price'])
           ])
    
    cursor.executemany(order_details_query, order_details_data)
    
    connection.commit()
    
    return order_id


if __name__ == '__main__':
    connection = getSqlConnection()
    
    print(insert_order(connection,{
        'customerName': 'Hulkman',
        'total':'63.9',
        "order_details":[{
            'prdouct_id':1,
            'quantity':1,
            'total_price':30
        },{
            'prdouct_id':6,
            'quantity':1,
            'total_price':33.9
        }]}))
