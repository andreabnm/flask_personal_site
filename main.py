from flask import Flask
from flask import render_template, send_from_directory, flash
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Email
from flask_ckeditor import CKEditor, CKEditorField
from flask_bootstrap import Bootstrap5
import email_validator
import email.message
import smtplib
import os

my_email = os.environ.get("MY_EMAIL")
email_password = os.environ.get("EMAIL_PASSWORD")
smtp_host = os.environ.get("SMTP_HOST")
smtp_port = int(os.environ.get("SMTP_PORT"))

app = Flask(__name__)
app.config['SECRET_KEY'] = 'gfdghdfgdffdfffd'
ckeditor = CKEditor(app)
Bootstrap5(app)


class ContactForm(FlaskForm):
    email = StringField("Your email", validators=[DataRequired(), Email()])
    message = CKEditorField("Message", validators=[DataRequired()])
    send = SubmitField("Send")


def send_email(sender, message):
    msg = email.message.Message()
    msg['Subject'] = f'Contact from {sender}'
    msg['From'] = sender
    msg['To'] = my_email
    msg.add_header('Content-Type', 'text/html')
    msg.set_payload(message)

    with smtplib.SMTP(smtp_host, port=smtp_port) as connection:
        connection.starttls()
        connection.login(user=my_email, password=email_password)
        connection.sendmail(from_addr=sender, to_addrs=my_email, msg=msg.as_string())


@app.route("/")
def main():
    return render_template("index.html")


@app.route("/skills")
def skills():
    return render_template("skills.html")


@app.route("/contacts", methods=["GET", "POST"])
def contacts():
    form = ContactForm()
    sent = False
    if form.validate_on_submit():
        sender_email = form.email.data
        message = form.message.data
        send_email(sender_email, message)
        sent = True
        flash("Message sent", "info")

    return render_template("contacts.html", form=form, sent=sent)


@app.route("/curriculum")
def curriculum():
    return send_from_directory(
        'static', path="files/Andrea_Bonomi_Curriculum.pdf"
    )


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'images/favicon.ico', mimetype='image/vnd.microsoft.icon')


if __name__ == '__main__':
    app.run(debug=True)
