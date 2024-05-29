import bcrypt

password = "admin_password".encode('utf-8')
hashed = bcrypt.hashpw(password, bcrypt.gensalt())

print(hashed.decode('utf-8'))

