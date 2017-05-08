from flask_wtf import CsrfProtect
csrf = CsrfProtect()
def create_session( username, usrType):
	  
	['username'] = username
	session['usrType'] = usrType

@app.route('/login', methods = ['GET', 'POST'])
def login():
	if not 'username' in session:
		login_form = forms.LoginForm(request.form)
		if request.method == 'POST' and login_form.validate():
			username = login_form.username.data
			pwd = login_form.pwd.data
			user = Users()
			
			status,codigo = user.exist_user(username, pwd)

			if status:
				message = 'Bienvenido {}'.format(username)
				flash(message, 'success')
				
				create_session(username, user.userType(username))
				
				return redirect( url_for('home') )

			else:
				if codigo == 1:	
					message = 'Username invalido'
					flash(message, 'error')

				if codigo == 2:
					message = 'Clave invalida'
					flash(message, 'error')

				if codigo == 3:
					message = 'Su cuenta no ha sido confirmada'
					flash(message, 'error')

		return render_template('login.html', form = login_form)
	return redirect(url_for('home'))

@app.route('/logout')
def logout():
	if 'username' in session:
		session.pop('username')		
		session.pop('usrType')		
	return redirect(url_for('home'))
