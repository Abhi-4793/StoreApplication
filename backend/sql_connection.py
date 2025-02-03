import mysql.connector
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get MySQL credentials from environment variables
db_host = os.getenv("DB_HOST")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_name = os.getenv("DB_NAME")
__cnx=None

def getSqlConnection():
    global __cnx
    if __cnx is None:
        __cnx = mysql.connector.connect(user=db_user, password=db_password,
                              host=db_host,
                              port=3305,
                              database=db_name)
    return __cnx