from sql_connection import getSqlConnection


def get_uoms(connection):
    cursor = connection.cursor()
    query = ("select * from uom")
    cursor.execute(query)
    response = []
    for (uom_id, uom_name) in cursor:
        response.append({
            'uom_id': uom_id,
            'uom_name': uom_name
        })
    return response


if __name__ == '__main__':

    connection = getSqlConnection()
    # print(get_all_products(connection))
    print(get_uoms(connection))