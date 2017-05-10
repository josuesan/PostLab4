#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, make_response, session, redirect, url_for, flash, escape, jsonify
import os, json
from bson import json_util
from bson.objectid import ObjectId
from flask_sqlalchemy import SQLAlchemy
from app.models.users import Users
from app.models.products import productos
from flask_cors import CORS, cross_origin
from flask_wtf import CsrfProtect
from app import app, db
CORS(app)
db.create_all()


csrf = CsrfProtect()
def create_session( username, admin):
	session['username'] = username
	session['admin'] = admin

@app.route('/logout')
def logout():
	if 'username' in session:
		session.pop('username')		
		session.pop('admin')	

@app.route("/login", methods = ['POST'])
def log_user():
	if not 'username' in session:
		user = Users()
		new = request.get_json()
		print(new)
		print(new['username'])
		usuario = new['username']
		clave = new['password']
		if user.login(usuario,clave):
			respuesta = {'error':False,'mensaje':'Inicio de sesión exitoso.'}
			create_session(usuario, user.is_Admin(usuario))
			return json.dumps(respuesta)
		else:
			respuesta = {'error':True,'mensaje':'Usuario o Contraseña incorrectos.'} 
			return json.dumps(respuesta)
	else:
		respuesta = {'error':True,'mensaje': 'Ya iniciaste sesión.'} 
		return json.dumps(respuesta)



# @app.route("/datosregistro", methods = ['GET', 'POST'])
# def registro_datos():
# 	if request.method == 'POST':
# 		user = Users()
# 		usuario = request.form['usuario']
# 		clave = request.form['clave']
# 		respuesta = user.get_user(usuario)
# 		return json.dumps(respuesta)
# 	return render_template('login.html') 
        

@app.route('/registro', methods = ['POST'])
def Register():
	if not 'username' in session:
		user = Users()
		new = request.get_json()

		(exist,campo) = user.exist_user(new['username'],new['email'])
		if exist == 1:
			if campo == 'email':
				respuesta = {'error':True,'mensaje':'Email registrado.'}
			else:
				respuesta = {'error':True,'mensaje':'Username registrado.'}
			
			return json.dumps(respuesta)
		else:
			user.create_user(new['username'],
						new['email'],
						new['password'],
						new['name'],
						new['lastname'],
						new['birthdate'],
						new['gender'],
						False)
			db.session.add(user)
			db.session.commit()

			respuesta = {'error':False,'mensaje':'Registro exitoso, serás redireccionado al inicio de sesión.'}
			return json.dumps(respuesta)
	

@app.route('/listar', methods = ['GET'])
def list():
	prod =productos()
	lista = prod.all_prod()
	if lista == 0:
		respuesta = {'error':True,'mensaje':'No hay artículos disponibles'} 
		print(jsonify(respuesta))
		return jsonify(respuesta)

	number = prod.number_prod()
	jsona = prod.convert(lista,number)
	print(jsona)
	return jsonify(jsona)

@app.route('/listar/<ide>', methods = ['GET'])
def part(ide):
	if ide.isdigit():
		_id = ide
		prod =productos()
		oneProd = prod.get_prod(_id)
		if oneProd == 0:
			respuesta = {'error':True,'mensaje':'Producto no existe'}
			return json.dumps(respuesta)
		else:
			oneProd = prod.get_prod(_id)
			return json.dumps(oneProd)
	respuesta = {'error':True,'mensaje':'Producto no existe.'}
	return json.dumps(respuesta)



@app.route('/crear', methods = ['POST'])
def create():	
	if 'username' in session:
		oneProd =productos()
		product = request.get_json()
		oneProd.create_prod(product['name'],product['price'],product['img'],product['description'],product['category'],product['sell'])
		db.session.add(oneProd)
		db.session.commit()
		respuesta = {'error':False,'mensaje':'Producto creado exitosamente.'}
		return json.dumps(respuesta)


@app.route('/editar/<ide>', methods=['PUT'])
def edit(ide):
	if 'username' in session:
		if ide.isdigit():
			_id = ide
			prod =productos()
			oneProd = prod.get_prod(_id)
			if oneProd == 0:
				respuesta = {'error':True,'mensaje':'Producto no existe'}
				return json.dumps(respuesta)
			else:
				product = request.get_json()
				#obtengo el objeto del producto de la bd para poder editarlo y obtengo el nuevo registro a almacenar
				(objProd,prodEdit) = prod.set_prod(_id, product['name'], product['price'], product['img'], product['description'], product['category'], product['sell'])

				objProd.update(prodEdit)  #edito el artículo
				db.session.commit() #guardo los cammbios
				respuesta = {'error':False,'mensaje':'Producto editado exitosamente.'}
				return json.dumps(respuesta)

		respuesta = {'error':True,'mensaje':'Producto no existe.'}
		return json.dumps(respuesta)


@app.route('/borrar/<ide>', methods=['DELETE'])
def delete(ide):
	if 'username' in session:
		if ide.isdigit():
			_id = ide	
			prod =productos()
			oneProd = prod.delete_prod(_id)
			if oneProd == 0:
				respuesta = {'error':True,'mensaje':'Producto no existe.'}
				return json.dumps(respuesta)
			else: 
				db.session.delete(oneProd)
				db.session.commit()
				respuesta = {'error':False,'mensaje':'Producto borrado exitosamente.'}
				return json.dumps(respuesta)

		respuesta = {'error':True,'mensaje':'Producto no existe.'}
		return json.dumps(respuesta)
